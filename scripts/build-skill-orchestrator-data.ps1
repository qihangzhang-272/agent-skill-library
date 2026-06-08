param(
  [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [string]$OutputPath = (Join-Path (Resolve-Path (Join-Path $PSScriptRoot '..')).Path 'apps\skill-orchestrator\data.js')
)

$ErrorActionPreference = 'Stop'

function Get-FrontMatterValue {
  param(
    [string]$Content,
    [string]$Key
  )

  $singleLine = "(?m)^$([regex]::Escape($Key)):\s*(.+)$"
  if ($Content -match $singleLine) {
    $value = $Matches[1].Trim()
    if ($value -eq '>') {
      $blockPattern = "(?ms)^$([regex]::Escape($Key)):\s*>\s*\r?\n(?<block>(?:\s{2}.+?\r?\n)+)"
      if ($Content -match $blockPattern) {
        return (($Matches['block'] -split "\r?\n") |
          ForEach-Object { $_.Trim() } |
          Where-Object { $_ }) -join ' '
      }
      return ''
    }
    return $value.Trim('"').Trim("'")
  }

  return ''
}

function Infer-Section {
  param([string]$RelativePath)

  if ($RelativePath -like '*oss-investment-scorecard*') { return 'investment' }
  if ($RelativePath -like '*ai-product-analyzer*') { return 'product' }
  if ($RelativePath -like '*awesome-design-skills*') { return 'frontend-design' }
  if ($RelativePath -like '*greensock-gsap-skills*') { return 'frontend-design' }
  if ($RelativePath -like '*typeui-fundamentals*') { return 'frontend-design' }
  return 'unknown'
}

$repo = Resolve-Path $RepoRoot
$skillsRoot = Join-Path $repo.Path 'skills'

$skillFiles = Get-ChildItem -Path $skillsRoot -Recurse -Filter 'SKILL.md' | Sort-Object FullName
$skills = foreach ($file in $skillFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw
  $relativePath = [System.IO.Path]::GetRelativePath($repo.Path, $file.FullName).Replace('\', '/')
  $skillDir = [System.IO.Path]::GetDirectoryName($relativePath).Replace('\', '/')
  $name = Get-FrontMatterValue -Content $content -Key 'name'
  if (-not $name) { $name = ($skillDir -split '/')[-1] }
  $description = Get-FrontMatterValue -Content $content -Key 'description'

  [ordered]@{
    id = $name
    title = ($name -replace '-', ' ')
    section = Infer-Section -RelativePath $relativePath
    path = $relativePath
    directory = $skillDir
    description = $description
    status = 'available'
  }
}

$payload = [ordered]@{
  generatedAt = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
  repository = [ordered]@{
    name = 'agent-skill-library'
    root = '.'
  }
  skills = @($skills)
}

$json = $payload | ConvertTo-Json -Depth 50
$targetDir = Split-Path $OutputPath -Parent
New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
Set-Content -LiteralPath $OutputPath -Value "window.SKILL_ORCHESTRATOR_DATA = $json;" -Encoding UTF8

Write-Output "Generated $OutputPath"
Write-Output "Skills: $($skills.Count)"
