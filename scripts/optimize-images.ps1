# Genera variantes JPEG optimizadas (sin dependencias externas) a partir de assets/img/*.jpg
# Uso: powershell -ExecutionPolicy Bypass -File scripts/optimize-images.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root 'assets\img'
$widths = @(480, 800, 1376)
$quality = 74L

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)

Get-ChildItem $src -Filter 'ref-*.jpg' | Where-Object { $_.BaseName -notmatch '-\d+$' } | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  foreach ($w in $widths) {
    if ($w -gt $img.Width) { continue }
    $h = [int]([math]::Round($img.Height * $w / $img.Width))
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $w, $h)
    $out = Join-Path $src ("{0}-{1}.jpg" -f $_.BaseName, $w)
    $bmp.Save($out, $codec, $params)
    $g.Dispose(); $bmp.Dispose()
    "{0}  {1}x{2}  {3} KB" -f (Split-Path $out -Leaf), $w, $h, [int]((Get-Item $out).Length / 1KB)
  }
  $img.Dispose()
}
