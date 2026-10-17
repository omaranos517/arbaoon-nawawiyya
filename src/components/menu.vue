<script setup>
defineProps({
    open: { type: Boolean, required: true },
    pos: { type: Object, default: () => ({ top: 0, left: 0 }) },
    items: { type: Array, default: () => [] },
})

const emit = defineEmits(['close', 'select'])

const onItem = (item) => {
    // emit('close')
    emit('select', item)
}
</script>

<template>
    <Teleport to="body">
        <Transition name="menu">
            <div v-if="open" class="menu-backdrop" @click="emit('close')">
                <ul class="menu" role="menu" dir="rtl" @click.stop
                    :style="{ top: pos.top + 'px', left: pos.left + 'px' }">
                    <li v-for="item in items" :key="item.key">
                        <button role="menuitem" @click="onItem(item)">{{ item.label }}</button>
                    </li>
                </ul>
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

.menu {
    position: fixed;
    min-width: 12rem;
    margin: 0;
    padding: 0.4rem;
    list-style: none;
    background: var(--card);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    transform-origin: top left;
}

.menu button {
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: start;
    font: inherit;
    color: var(--text-primary);
    background: transparent;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
}

.menu button:hover { background: var(--surface-elevated); }

.menu-enter-active, .menu-leave-active { transition: opacity 0.15s ease; }
.menu-enter-active .menu, .menu-leave-active .menu { transition: transform 0.15s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; }
.menu-enter-from .menu, .menu-leave-to .menu { transform: scale(0.95); }
</style>