<template>
    <div>
        <Banner/>
        <NavbarMain/>
        <div id="resource-packs-envelope">
            <img src="../assets/resource-packs.png" alt="">
            <div id="resource-packs">
                <ResourcePack v-for="pack in resourcePacks" v-bind:key="pack.packName" :pack="pack"/>
            </div>
        </div>
    </div>
</template>

<script>
import Banner from '@/components/Banner'
import NavbarMain from '@/components/NavbarMain'
import ResourcePack from '@/components/ResourcePack'

export default {
    name: 'ResourcePacks',
    components: {
        Banner,
        NavbarMain,
        ResourcePack
    },
    data() {
        return {
            resourcePacks: [
                {
                    packName: 'Curie House Pack',
                    packUrl: 'https://github.com/Ubunfu/CuriePack',
                    packDesc: 'Curie Ave house sponsored resource pack!'
                }
            ]
        }
    }
}
</script>

<style>
#resource-packs {
    margin: auto auto;
    max-width: 50%;
    background-color:ghostwhite;
    border-radius: 20px;
    padding: 10px;
}
#resource-packs-envelope {
    margin: 50px 0 0 0;
}
</style>