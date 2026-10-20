import cfg from './app.config.json' with { type: 'json' }

export default {
    appId: cfg.appId,
    productName: cfg.appName,
    files: ['dist/**', 'electron/**'],
    win:   { target: 'dir' },
    linux: { target: 'dir' },
}