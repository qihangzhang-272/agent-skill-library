[CmdletBinding()]
param(
  [string]$ConfigPath = "catalog/claude-plugins.json"
)

$ErrorActionPreference = "Stop"

function ConvertTo-PrettyJson {
  param([Parameter(Mandatory = $true)]$Value)
  $Value | ConvertTo-Json -Depth 32
}

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Value
  )

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Value, $encoding)
}

function Assert-ChildPath {
  param(
    [Parameter(Mandatory = $true)][string]$Parent,
    [Parameter(Mandatory = $true)][string]$Child
  )

  $parentPath = [System.IO.Path]::GetFullPath($Parent).TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)
  $childPath = [System.IO.Path]::GetFullPath($Child)

  if (-not $childPath.StartsWith($parentPath, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to write outside repository: $childPath"
  }
}

function Copy-SkillPackage {
  param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Destination
  )

  if (-not (Test-Path -LiteralPath $Source -PathType Container)) {
    throw "Skill source directory not found: $Source"
  }

  $skillFile = Join-Path $Source "SKILL.md"
  if (-not (Test-Path -LiteralPath $skillFile -PathType Leaf)) {
    throw "Skill source must contain SKILL.md: $Source"
  }

  $destinationParent = Split-Path -Parent $Destination
  New-Item -ItemType Directory -Force -Path $destinationParent | Out-Null

  if (Test-Path -LiteralPath $Destination) {
    Remove-Item -LiteralPath $Destination -Recurse -Force
  }

  Copy-Item -LiteralPath $Source -Destination $Destination -Recurse -Force
}

$repoRoot = (Resolve-Path ".").Path
$configFullPath = Join-Path $repoRoot $ConfigPath

if (-not (Test-Path -LiteralPath $configFullPath -PathType Leaf)) {
  throw "Plugin config not found: $configFullPath"
}

$config = Get-Content -Raw -LiteralPath $configFullPath | ConvertFrom-Json
$pluginsRoot = Join-Path $repoRoot "plugins"
$marketplaceRoot = Join-Path $repoRoot ".claude-plugin"

Assert-ChildPath -Parent $repoRoot -Child $pluginsRoot
Assert-ChildPath -Parent $repoRoot -Child $marketplaceRoot

New-Item -ItemType Directory -Force -Path $pluginsRoot | Out-Null
New-Item -ItemType Directory -Force -Path $marketplaceRoot | Out-Null

$configuredPluginNames = @($config.plugins | ForEach-Object { $_.name })
foreach ($existingPlugin in Get-ChildItem -LiteralPath $pluginsRoot -Directory) {
  Assert-ChildPath -Parent $pluginsRoot -Child $existingPlugin.FullName
  if ($configuredPluginNames -notcontains $existingPlugin.Name) {
    Remove-Item -LiteralPath $existingPlugin.FullName -Recurse -Force
  }
}

$origin = ""
try {
  $origin = (git config --get remote.origin.url) 2>$null
} catch {
  $origin = ""
}

$marketplacePlugins = @()

foreach ($plugin in $config.plugins) {
  $pluginRoot = Join-Path $pluginsRoot $plugin.name
  $pluginManifestDir = Join-Path $pluginRoot ".claude-plugin"
  $pluginSkillsRoot = Join-Path $pluginRoot "skills"

  Assert-ChildPath -Parent $repoRoot -Child $pluginRoot

  if (Test-Path -LiteralPath $pluginRoot) {
    Remove-Item -LiteralPath $pluginRoot -Recurse -Force
  }

  New-Item -ItemType Directory -Force -Path $pluginManifestDir | Out-Null
  New-Item -ItemType Directory -Force -Path $pluginSkillsRoot | Out-Null

  foreach ($skill in $plugin.skills) {
    $source = Join-Path $repoRoot $skill.sourcePath
    $destination = Join-Path $pluginSkillsRoot $skill.targetName
    Assert-ChildPath -Parent $repoRoot -Child $source
    Assert-ChildPath -Parent $repoRoot -Child $destination
    Copy-SkillPackage -Source $source -Destination $destination
  }

  $manifest = [ordered]@{
    name = $plugin.name
    displayName = $plugin.displayName
    version = $plugin.version
    description = $plugin.description
    author = $config.marketplace.owner
    repository = $origin
    keywords = @($plugin.keywords)
    skills = "./skills"
  }

  $manifestPath = Join-Path $pluginManifestDir "plugin.json"
  Write-Utf8NoBom -Path $manifestPath -Value (ConvertTo-PrettyJson $manifest)

  $marketplacePlugin = [ordered]@{
    name = $plugin.name
    source = "./plugins/$($plugin.name)"
    description = $plugin.description
    version = $plugin.version
    author = $config.marketplace.owner
    strict = $true
  }

  $marketplacePlugins += $marketplacePlugin
}

$marketplace = [ordered]@{
  name = $config.marketplace.name
  description = $config.marketplace.description
  owner = $config.marketplace.owner
  plugins = $marketplacePlugins
}

$marketplacePath = Join-Path $marketplaceRoot "marketplace.json"
Write-Utf8NoBom -Path $marketplacePath -Value (ConvertTo-PrettyJson $marketplace)

Write-Host "Generated Claude marketplace: $marketplacePath"
Write-Host "Generated plugins: $($marketplacePlugins.Count)"
