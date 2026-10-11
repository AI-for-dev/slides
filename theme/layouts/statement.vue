<template>
  <div class="slidev-layout stmt">
    <Bascule class="stmt-art" :step="5" :y="0.9" :pivot="0.5" :amp="110" />
    <slot />
  </div>
</template>
