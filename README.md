<p align="right">
    <img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"/>
</p>

# arbaoon-nawawiyya

An Islamic reading app for the Forty Hadith of Imam al-Nawawi, with explanations and narrator biographies.

## Development

### Requirements

This project pins its tool versions in `mise.toml`. Install [mise](https://mise.jdx.dev) once, then every version is handled automatically.

**Linux (zsh):**
```sh
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc
```

**Linux (bash):**
```sh
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
```

**Windows (PowerShell):**
```powershell
winget install jdx.mise
if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
Add-Content $PROFILE '(&mise activate pwsh) | Out-String | Invoke-Expression'
```

### Project Setup

```sh
mise install
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run android
```