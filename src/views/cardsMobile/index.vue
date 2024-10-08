<template>
  <section class="section-main">
    <div class="card-mobile">
      <CardCenterMobile />
    </div>
  </section>

  <section class="bg-gray-100">
    <MenuCardMobile />
  </section>
</template>

<script lang="ts" setup>
import MenuCardMobile from './components/MenuCardMobile.vue'
import CardCenterMobile from './cardCenterMobile/CardCenterMobile.vue'
</script>
<style lang="scss" scoped>
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: #495057;
  font-size: 1.2rem;
  font-family: 'KanitRegular';
}

.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link {
  padding: 0.75rem 3.5rem;
}

.card-mobile {
  display: block;
  @media only screen and (min-width: 992px) {
    display: none;
  }
}

.card-desktop {
  display: none;

  @media only screen and (min-width: 992px) {
    display: block;
  }
}
</style>
