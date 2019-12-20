<template>
    <div id="navbar-main">
        <nav>
            <ul>
                <router-link to="/"><li>Home</li></router-link>
                <router-link to="/dashboard"><li>Dashboard</li></router-link>
                <router-link to="/packs"><li>Resource Packs</li></router-link>
                <router-link to="/credits"><li>Credits</li></router-link>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavbarMain',
}
</script>

<style>
#navbar-main a:link, a:visited {
    color: inherit;
    text-decoration: none;
}

#navbar-main nav {
    margin: auto auto;
    max-width: 50%;
}

#navbar-main nav ul {
    list-style-type: none;
    padding: 5px;
}

#navbar-main nav ul li {
    background-image: url('../assets/grass_side.png');
    background-repeat: repeat-x;
    text-align: center;
    display: inline;
    padding: 5px 15px;
    font-weight: bold;
    box-shadow: 1px 2px 1px black;
    color: white;
}

#navbar-main nav ul li:hover {
    background-image: url('../assets/grass_side_green.png');
}
</style>