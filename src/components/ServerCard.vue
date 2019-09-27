<template>
  <div class="server-card">
      <div class="server-card-icon">
          <img src="../assets/old-server.gif" alt="">
      </div>
      <div class="server-card-metadata">
          <ul>
            <li>
                <span class="label">Status:  </span>
                <span class="value">{{ server.instanceState }}</span>
            </li>
            <li>
                <span class="label">Region:  </span>
                <span class="value">{{ region }}</span>
            </li>
            <li>
                <span class="label">Instance ID:  </span>
                <span class="value">{{ server.instanceId }}</span>
            </li>
            <li>
                <span class="label">Public DNS:  </span>
                <span class="value">{{ server.publicDnsName }}</span>
            </li>
          </ul>
      </div>
      <div class="server-card-actions" @click="sayHello">
          <div class="stop-botton">STOP SERVER</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ServerCard',
    props: ['server'],
    data: function () {
        return {
            region: 'us-east-2'
        }
    },
    methods: {
    }

}
</script>

<style>
.server-card {
    width: 500px;
    height: 200px;
    color: lightgray;
    box-shadow: 0 2px 3px 0 white;
    padding: 10px;
    margin: 15px;
    overflow: hidden;
}

.server-card-icon {
    float: left;
    margin-right: 20px;
}

.server-card-icon img {
    height: 150px;
}

.server-card-metadata {
    float: right;
    text-align: left;
    width: 60%;
}

.server-card-metadata .label {
    font-weight: bold;
}

.server-card-metadata ul {
    list-style-type: none;
}

.server-card-actions {
    margin: 20px;
    background-color: red;
    float: right;
    padding: 5px 10px;
    color: white;
    font-weight: bolder;
}

</style>