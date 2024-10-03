<template>
  <div
    :class="{ 'not-clickable': !isClickable }"
    class="card col p-2 cursor-pointer dropDownWire"
    style="margin: 0 auto; border: 1px solid #00beb0"
    @click="toggleDropdown"
  >
    <div class="flex justify-content-between align-items-center">
      <div class="flex col-10">
        <div class="mr-2">
          <img alt="" src="../../../../assets/icons/bank_wire.svg" style="width: 44px; height: 44px" />
        </div>

        <div>
          <h3 class="font-medium m-1">{{ t('typeWithdrawText') }}</h3>
          <div class="flex">
            <div
              class="card pl-3 pr-3 m-0 mr-3"
              style="
                background: #dcf9eb;
                color: #21bf73 !important;
                padding: 0.25rem 1rem !important;
                line-height: 14px;
                height: 1.8rem;
              "
            >
              {{ t('available') }}
            </div>
          </div>
        </div>
      </div>

      <div class="col md:col-2">
        <i class="pi pi-angle-down text-2xl" />
      </div>
    </div>

    <div v-if="dropdownVisible" class="country-list">
      <div
        :style="
          wireLocalType === 'ACH'
            ? {
                background: firstOptionBgColor,
                color: firstOptionTextColor,
                opacity: firstOptionOpacity,
              }
            : {
                background: secondOptionBgColor,
                color: secondOptionTextColor,
                opacity: secondOptionOpacity,
              }
        "
        class="text-center font-medium"
        @click="beneficiaryAch('ach')"
      >
        {{ t('abaAch') }}
      </div>
    </div>
    <div v-if="dropdownVisible" class="country-list" style="top: 144px">
      <div
        :style="
          wireLocalType === 'FEDWIRE'
            ? {
                background: firstOptionBgColor,
                color: firstOptionTextColor,
                opacity: firstOptionOpacity,
              }
            : {
                background: secondOptionBgColor,
                color: secondOptionTextColor,
                opacity: secondOptionOpacity,
              }
        "
        class="text-center font-medium"
        @click="beneficiaryAch('fedwire')"
      >
        {{ t('abaFed') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import router from '../../../../router/router'
import { useRouter } from 'vue-router'
import { useListBeneficiaryUsa } from '../../fiat/usa/composable/useListBeneficiaryUsa'

const props = defineProps({
  defaultDropdownVisible: { type: Boolean, default: false },
  isClickable: { type: Boolean, default: true },
  firstOptionBgColor: { type: String, default: '#FFFFFF' },
  firstOptionTextColor: { type: String, default: '#00BEB0' },
  firstOptionOpacity: { type: Number, default: 1 },
  secondOptionBgColor: { type: String, default: '#00BEB0' },
  secondOptionTextColor: { type: String, default: '#FFFFFF' },
  secondOptionOpacity: { type: String, default: 1 },
})

const { t } = useI18n({ useScope: 'global' })
const { wireLocalType } = useListBeneficiaryUsa()
const dropdownVisible = ref(props.defaultDropdownVisible)

const beneficiaryAch = (data: string) => {
  wireLocalType.value = data.toUpperCase()
  router.push(`/withdraw/fiat/usa/${data.toUpperCase()}/new-beneficiary`)
}

const toggleDropdown = () => {
  if (props.isClickable) {
    dropdownVisible.value = !dropdownVisible.value
  }
}

const route = useRouter()

const extractWireLocalType = () => {
  const path = route.currentRoute.value.path
  const match = path.match(/\/usa\/([^\/]*)\//)
  if (match && match[1]) {
    wireLocalType.value = match[1]
  }
}

extractWireLocalType()

const handleClick = (e: MouseEvent) => {
  if (props.isClickable) {
    if (e.target && e.target instanceof HTMLElement) {
      if (!e.target.closest('.dropDownWire')) {
        dropdownVisible.value = false
      }
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--primary-color);
  margin: 0 auto;
  padding: 2rem;
  position: relative;
}

.country-list {
  position: absolute;
  top: 88px;
  left: 0;
  width: 100%;
  z-index: 1;
  background: white;
  max-height: 224px;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  list-style: none;
  margin: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #00beb0 #f0f0f0;
}

.country-list div {
  padding: 1.2rem;
  cursor: pointer;
  font-size: 13px;
}

.country-list div:hover {
  background: #f0ffff;
}

.not-clickable {
  cursor: default;
}
</style>
