<template>
  <div class="server-card">
      <div class="server-card-icon">
          <img v-if="server.instanceState == 'running'" src="../assets/old-server.gif" alt="">
          <img v-else src="../assets/bsod.jpg" alt="" style="height:120px;">
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
      <div class="server-card-actions">
          <div class="stop-botton" v-if="server.instanceState == 'running' && stoppingServer== false" @click="stopServer(server.instanceId, idToken)">STOP SERVER</div>
          <div class="stop-botton" v-else-if="stoppingServer== true">STOPPING...</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ServerCard',
    props: ['server', 'idToken'],
    data: function () {
        return {
            region: 'us-east-2',
            stoppingServer: false
        }
    },
    methods: {
        stopServer: async function (instanceId, idToken) {
            this.stoppingServer=true;
            // eslint-disable-next-line
            console.log('idtoken: ' + idToken)
            const resp = await fetch('https://ablsu41v22.execute-api.us-east-2.amazonaws.com/dev/server/stop', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + idToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'instanceId': instanceId})
            });
            if (await resp.status == 200) {
                const respJson = await resp.json();
                // eslint-disable-next-line
                console.log('resp: ' + JSON.stringify(respJson))
                alert('Server ' + instanceId + ' is on it\'s way down!  Just a moment...');
            }
        }
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