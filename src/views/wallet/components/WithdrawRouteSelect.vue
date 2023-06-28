<template>
  <div
    class="col-4 justify-content-start container-link-historic-desktop sm:text-center sm:text-center md:text-center lg:text-left"
    :class="[isFiat ? 'fiat-dropdown' : 'asset-dropdown']"
  >
    <Dropdown
      @change="handleDropdownChange"
      :options="links"
      optionLabel="name"
      placeholder="Withdraw"
      class="w-full sm:w-10rem md:w-8rem lg:w-9rem sm:text-center"
    >
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useRouter } from 'vue-router'

const props = defineProps<{
  isFiat: boolean
}>()
const fiatLinks = [
  { name: 'Transfer between noba accounts', link: '/withdraw/noba/fiat' },
  { name: 'Domestic Wire', link: '/withdraw/fiat/domestic' },
  { name: 'International Wire', link: '/withdraw/fiat/international' },
]
const assetLinks = [
  { name: 'Netween Noba Crypto Wallets', link: '/withdraw/noba/crypto' },
  { name: 'To other platform crypto wallets', link: '/withdraw/crypto/other' },
]
const links: any = ref()
const router = useRouter()

onMounted(() => {
  if (props.isFiat) {
    links.value = fiatLinks
  }
  if (!props.isFiat) {
    links.value = assetLinks
  }
})

const handleDropdownChange = (selectedOption: any) => {
  router.push(selectedOption.value.link)
}
</script>

<style lang="scss" scoped>
// dropdown container
.p-dropdown {
  margin-left: -6px;
}

// label and icon
.fiat-dropdown ::v-deep .p-dropdown-label.p-placeholder {
  color: #fff !important;
  padding-left: 0 !important;
}
.fiat-dropdown ::v-deep .p-dropdown-trigger {
  color: #fff !important;
  padding-left: 0 !important;
  justify-content: start;
}

.asset-dropdown ::v-deep .p-dropdown-label.p-placeholder {
  color: #fff !important;
  padding-left: 0 !important;
}

.asset-dropdown ::v-deep .p-dropdown-trigger {
  color: #fff !important;
  padding-left: 0 !important;
  justify-content: start;
}

// dropdown clases
.fiat-dropdown {
  .p-dropdown {
    background: #134591 !important;
    border-color: #134591 !important;
  }

  .p-dropdown-label.p-placeholder {
    color: #fff !important;
  }

  .p-inputgroup input:hover,
  .p-inputgroup input:focus,
  .p-dropdown.p-component.p-inputwrapper:hover {
    border-color: #134591 !important;
  }

  .p-inputgroup input:hover,
  .p-inputgroup input:focus,
  .p-dropdown:not(.p-disabled).p-focus {
    border-color: #134591 !important;
  }

  .p-dropdown-label.p-placeholder {
    color: #fff !important;
  }
}

.asset-dropdown {
  .p-dropdown {
    background: #0f655d !important;
    border-color: #0f655d !important;
  }

  .p-inputgroup input:hover,
  .p-inputgroup input:focus,
  .p-dropdown.p-component.p-inputwrapper:hover {
    border-color: #0f655d !important;
  }

  .p-inputgroup input:hover,
  .p-inputgroup input:focus,
  .p-dropdown:not(.p-disabled).p-focus {
    border-color: #0f655d !important;
  }
}
@media only screen and (max-width: 991px) {
  .container-link-historic-desktop {
    margin: 0;
    padding: 0;
  }
}

// responsive label
.fiat-dropdown ::v-deep .p-dropdown-label.p-placeholder {
  margin: auto;

  @media only screen and (max-width: 575px) {
    --max-font: 40;
    --min-font: 15;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 576px) {
    --max-font: 20;
    --min-font: 12;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 991px) {
    /* Set max and min font sizes */
    --max-font: 15;
    --min-font: 10;
    font-size: var(--responsive);
  }
}

// responsive label
.asset-dropdown ::v-deep .p-dropdown-label.p-placeholder {
  margin: auto;

  @media only screen and (max-width: 575px) {
    --max-font: 40;
    --min-font: 15;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 576px) {
    --max-font: 20;
    --min-font: 12;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 991px) {
    //991
    /* Set max and min font sizes */
    --max-font: 15;
    --min-font: 10;
    font-size: var(--responsive);
  }
}
</style>
