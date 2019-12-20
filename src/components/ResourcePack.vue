<template>
  <div class="resource-pack">
      <a :href="pack.packUrl">
        <h3>{{ pack.packName }}</h3>
      </a>
      <p>{{ pack.packDesc }}</p>
  </div>
</template>

<script>
export default {
    name: 'ResourcePack',
    components: {
    },
    props: ['pack']
}
</script>

<style>
.resource-pack {
    display: block;
    color: darkslategray;
}
.resource-pack a {
    display: block;
}

</style>