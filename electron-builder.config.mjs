import cfg from './app.config.json' with { type: 'json' }

export default {
    appId: cfg.appId,
    productName: cfg.appName,
    files: ['dist/**', 'electron/**'],
    win:   { target: 'dir' },
    linux: { target: 'dir', syncDesktopName: true, category: 'Education', },
    flatpak: {
    runtime: 'org.freedesktop.Platform',
    runtimeVersion: '25.08',
    sdk: 'org.freedesktop.Sdk',
    finishArgs: [
        '--socket=x11',
        '--socket=wayland',
        '--share=ipc',
        '--device=dri',
    ],
    },
}