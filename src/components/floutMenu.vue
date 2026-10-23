<script setup>
defineProps({
    open: { type: Boolean, required: true },
    pos: { type: Object, default: () => ({ top: 0, left: 0 }) },
    items: { type: Array, default: () => [] },
})

const emit = defineEmits(['select', 'close'])

const onItem = (item) => {
    emit('select', item)
}
</script>

<template>
    <Teleport to="body">
        <Transition name="menu" :duration="{ enter: 350, leave: 150 }">
            <div
                v-if="open"
                class="menu-backdrop"
                @click="emit('close')"
                @keydown.esc="emit('close')"
            >
                <div
                    class="fab-stack"
                    role="menu"
                    :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
                >
                    <button
                        v-for="(item, i) in items"
                        :key="item.key"
                        class="fab"
                        role="menuitem"
                        :aria-label="item.label"
                        :title="item.label"
                        :style="{ '--i': i }"
                        @click.stop="onItem(item)"
                    >
                        <component :is="item.icon" class="icon" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.menu-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
}

.fab-stack {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.fab {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    padding: 0;
    color: var(--primary);
    background: color-mix(in srgb, var(--primary) 16%, var(--card));
    -webkit-backdrop-filter: blur(14px) saturate(140%);
    backdrop-filter: blur(14px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
    cursor: pointer;
}

.fab .icon {
    width: 24px;
    height: 24px;
}

.fab:active {
    transform: scale(0.92);
}
@media (hover: hover) {
    .fab:hover {
        background: var(--surface-elevated);
    }
}

/* دخول: ظهور متدرج واحدة ورا التانية */
.menu-enter-active .fab {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
    transition-delay: calc(var(--i) * 40ms);
}
/* خروج: سريع وبدون تأخير */
.menu-leave-active .fab {
    transition:
        opacity 0.12s ease,
        transform 0.12s ease;
}
.menu-enter-from .fab,
.menu-leave-to .fab {
    opacity: 0;
    transform: translateY(-12px) scale(0.6);
}
</style>
