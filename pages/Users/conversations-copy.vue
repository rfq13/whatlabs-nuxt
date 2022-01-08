<template>
  <div>
    <h1>haloo</h1>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select @change="checkChanges($event)" v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
</template>

<script>
export default {
  methods: {
    checkChanges(e) {
      const prev = this.$colorMode.value
      const now = this.$colorMode.preference
      const el = document.getElementById('content-wrapper')
      // console.log(el.classList)
      el.classList.remove('nwa-' + prev + '-mode')
      el.classList.remove('nwa-system-mode')
      el.classList.add('nwa-' + now + '-mode')
      // console.log(el.classList, 'added')
    },
    tell() {
      // console.log('langsre');
    }
  }
}
</script>
