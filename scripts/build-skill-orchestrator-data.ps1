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

  $escapedKey = [regex]::Escape($Key)
  $lines = $Content -split "\r?\n"

  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -notmatch "^$escapedKey`:\s*(.+)$") {
      continue
    }

    $value = $Matches[1].Trim()
    if ($value -eq '>' -or $value -eq '|') {
      $blockLines = @()
      for ($j = $i + 1; $j -lt $lines.Count; $j++) {
        if ($lines[$j] -match '^\s{2,}(.+)$') {
          $blockLines += $Matches[1].Trim()
          continue
        }

        if ($lines[$j] -match '^\s*$') {
          continue
        }

        break
      }

      return ($blockLines | Where-Object { $_ }) -join ' '
    }

    return $value.Trim('"').Trim("'")
  }

  return ''
}

function Infer-Section {
  param([string]$RelativePath)

  if ($RelativePath -like '*oss-investment-scorecard*') { return 'investment' }
  if ($RelativePath -like '*ai-product-analyzer*') { return 'product' }
  if ($RelativePath -like '*chinese-natural-voice-revision*') { return 'writing' }
  if ($RelativePath -like '*humanizer-zh*') { return 'writing' }
  if ($RelativePath -like '*md2wechat*') { return 'writing' }
  if ($RelativePath -like '*qihang-writing-style*') { return 'writing' }
  if ($RelativePath -like '*skills/frontend-design/SKILL.md') { return 'frontend-design' }
  if ($RelativePath -like '*awesome-design-skills*') { return 'frontend-design' }
  if ($RelativePath -like '*greensock-gsap-skills*') { return 'frontend-design' }
  if ($RelativePath -like '*typeui-fundamentals*') { return 'frontend-design' }
  if ($RelativePath -like '*taste-skill*') { return 'frontend-design' }
  if ($RelativePath -like '*impeccable*') { return 'frontend-design' }
  return 'unknown'
}

function Get-RelativePathCompat {
  param(
    [Parameter(Mandatory = $true)][string]$BasePath,
    [Parameter(Mandatory = $true)][string]$TargetPath
  )

  $baseFullPath = [System.IO.Path]::GetFullPath($BasePath)
  if (-not $baseFullPath.EndsWith([System.IO.Path]::DirectorySeparatorChar)) {
    $baseFullPath += [System.IO.Path]::DirectorySeparatorChar
  }

  $targetFullPath = [System.IO.Path]::GetFullPath($TargetPath)
  $baseUri = New-Object System.Uri($baseFullPath)
  $targetUri = New-Object System.Uri($targetFullPath)

  [System.Uri]::UnescapeDataString($baseUri.MakeRelativeUri($targetUri).ToString()).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
}

$repo = Resolve-Path $RepoRoot
$skillsRoot = Join-Path $repo.Path 'skills'

$skillFiles = Get-ChildItem -Path $skillsRoot -Recurse -Filter 'SKILL.md' |
  Where-Object { $_.FullName -notmatch '[\\/](upstream)[\\/]' } |
  Sort-Object FullName
$skills = foreach ($file in $skillFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  $relativePath = (Get-RelativePathCompat -BasePath $repo.Path -TargetPath $file.FullName).Replace('\', '/')
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
