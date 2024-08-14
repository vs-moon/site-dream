<script setup>
import { useOptions, useRunning } from './index.js'
import { computed, ref, useAttrs, watch } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import { UPDATE_MODEL_VALUE } from '@vs-common/const'

const name = 'UpAceEditor'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {} = useRunning({ attrs, slots, emits, props, name })

const modelValue = defineModel({ required: true, default: '' })
const modelLang = defineModel('lang', { default: 'text' })
const modelTheme = defineModel('theme', { default: 'tomorrow_night_eighties' })

const lang = ref(modelLang.value)
const theme = ref(modelTheme.value)

const langComputed = computed(() => useOptions.confine.langOptions.find(v => v.value === lang.value))
const themeComputed = computed(() => useOptions.confine.themeOptions.find(v => v.value === theme.value))
const optionsComputed = computed(() => ({ ...useOptions.confine.defaultOptions, ...props.options }))

const onCommandLang = command => {
  lang.value = command
  emits('update:lang', command)
}

const onCommandTheme = command => {
  theme.value = command
  emits('update:theme', command)
}

watch(modelValue, v => {
  if (v === null) {
    emits(UPDATE_MODEL_VALUE, '')
  }
})

watch(modelLang, v => {
  lang.value = v
})

watch(modelTheme, v => {
  theme.value = v
})

</script>

<template>
  <ElCard shadow="always">
    <template #default>
      <VAceEditor
        v-model:value="modelValue"
        :options="optionsComputed"
        :="attrs"
        :lang
        :theme
        :readonly />
    </template>
    <template #footer>
      <ElSpace>
        <Component
          v-if="langComputed.component"
          :is="langComputed.component"
          v-model="modelValue"
          :readonly />
        <ElButtonGroup>
          <ElButton type="info" text bg icon="Setting">
            {{ langComputed.label }}
          </ElButton>
          <ElDropdown v-show="!readonly" @command="onCommandLang" trigger="click">
            <template #default>
              <ElButton type="info" text bg icon="ArrowDown" />
            </template>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem
                  v-for="item in useOptions.confine.langOptions"
                  :key="item.value"
                  :command="item.value">
                  {{ item.label }}
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </ElButtonGroup>
        <ElForm>
          <ElButtonGroup>
            <ElButton type="info" text bg icon="Mug">
              {{ themeComputed.label }}
            </ElButton>
            <ElDropdown @command="onCommandTheme" trigger="click">
              <template #default>
                <ElButton type="info" text bg icon="ArrowDown" />
              </template>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="item in useOptions.confine.themeOptions"
                    :key="item.value"
                    :command="item.value">
                    {{ item.label }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </ElButtonGroup>
        </ElForm>
      </ElSpace>
    </template>
  </ElCard>
</template>

<style lang="scss" scoped>
.el-card {
  width: 100%;

  :deep(.el-card__footer) {
    display: flex;
    justify-content: flex-end;
  }

  :deep(.el-col) {
    min-height: unset;
  }
}
</style>