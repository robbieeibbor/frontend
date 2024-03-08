<template>
  <div id="mapApp">
    <div id ="vesselInputBox">
      <h4>
    <p>Please enter ship name and select the date range (only within April 2023 currently)<br>
    <br>The estimated emissions will then be shown below.</p>
      </h4>
      <form @submit.prevent ="onSubmit">
 <br> <b>  <label for="vesselName">Ship Name:</label>
<br>
        <input v-model="vesselNameFromInput" type="text" class="form-control" list="shipNames">
            <datalist id="shipNames">
      <option v-for="(ship, index) in shipList" :key="index" :value="ship">{{ ship }}</option>
    </datalist>
    <br> <label for="startDate">From:</label>
        <br><input v-model="startDate" type="text" class="form-control" placeholder="YYYY-MM-DD">
        <br><label for="endDate">To:</label></b>
        <br><input v-model="endDate" type="text" class="form-control" placeholder="YYYY-MM-DD">
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div id="dataContainer">

      <div id="distance">
        <h5>
          <span v-if="dataDistance !== '' && !isNaN(dataDistance)">Estimated Distance </span>
                   <span class="right-aligned" v-if="dataDistance !== '' && !isNaN(dataDistance)">{{dataDistance}} nm</span>
 
        </h5>
      </div>
        <div id="fuelConsumption">
        <h5>
          <span v-if="dataFuelConsumption !== '' && !isNaN(dataFuelConsumption)">Fuel Consumption </span>
          <span class="right-aligned" v-if="dataFuelConsumption !== '' && !isNaN(dataFuelConsumption)">{{dataFuelConsumption}} mt</span>

        </h5>
      </div>
        <div id="CO2Emissions">
        <h5>
          <span v-if="dataCO2Emissions !== '' && !isNaN(dataCO2Emissions)">CO2 Emissions </span>
          <span class="right-aligned" v-if="dataCO2Emissions !== '' && !isNaN(dataCO2Emissions)">{{dataCO2Emissions}} mt</span>
      
        </h5>
        <h6> Disclaimer: The data provided here is an <b><u>estimate</u></b> and is not to be used. This is a research project only. 
        </h6>
      </div>
    </div>
  <div id="map">
      <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
    </div>
</div>
</template>

<script>

export default {
  name: "HereMap",

  data() {
    return {
      platform: null,
      apikey: "REMOVED FOR SECURITY",
      coordinates: [],
      vesselNameFromInput: '',
      startDate: '',
      endDate: '',
      dataDistance:'',
      dataFuelConsumption:'',
      dataCO2Emissions:'',
            shipList: [
              'CC Champs Elysees',
'CMA CGM Jean Mermoz',
'CMA CGM Montmartre',
'CMA CGM Palais Royal',
'CMACGM Jacques Saade',
'CMACGM Louis Bleriot',
'Madison Maersk',
'Majestic Maersk',
'Margrethe Maersk',
'Maribo Maersk',
'Mary Maersk',
'Mathilde Maersk',
'MSC Hamburg',
'MSC Jade',
'MSC Maya',
'MSC Oscar',
'MSC Reef',
'MSC Rifaya',
'MSC Zoe',
'Munkebo Maersk'
      ]
    };
  },
  async mounted() {
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.initializeHereMap();
      },
  methods: {
    initializeHereMap() {
      if (this.map) {
      // get rid of existing map if it exists
      this.map.dispose();
      console.log("map found")
    }
      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      var maptypes = this.platform.createDefaultLayers();

      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 3,
        center: this.coordinates.length > 0 ? this.coordinates[0] : { lat: 50, lng: 0 }
      });

      addEventListener("resize", () => this.map.getViewPort().resize());

      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      H.ui.UI.createDefault(this.map, maptypes);

      const lineString = new H.geo.LineString();

      this.coordinates.forEach(coord => {
        lineString.pushPoint(coord);
      });

      const polyline = new H.map.Polyline(lineString, {
        style: { lineWidth: 4, strokeColor: 'red' }
      });

      this.map.addObject(polyline);
    },
    async onSubmit(e){
      e.preventDefault();
    console.log("vessel Name ", this.vesselNameFromInput)
    console.log("start date ", this.startDate,"  end ",this.endDate)
        const url = `http://localhost:8000/api/test-table/?vessel_name=${this.vesselNameFromInput}&start_date=${this.startDate}&end_date=${this.endDate}`;
        const response = await fetch(url);
        const data = await response.json();
        this.coordinates = data.map((item) => ({
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
        }));
        this.initializeHereMap();
        const urlDistance = `http://localhost:8000/api/get_distance/?vessel_name=${this.vesselNameFromInput}&start_date=${this.startDate}&end_date=${this.endDate}`;
        const responseDistance = await fetch(urlDistance);
        var dataDistance = await responseDistance.json();
        dataDistance = dataDistance.toFixed(2)
        this.dataDistance = dataDistance
        console.log('distance ',dataDistance)
        const urlFuelConsumption = `http://localhost:8000/api/get_fuel_consumption/?vessel_name=${this.vesselNameFromInput}&start_date=${this.startDate}&end_date=${this.endDate}`;
        const responseFuelConsumption = await fetch(urlFuelConsumption);
        var dataFuelConsumptionArray = await responseFuelConsumption.json();
        console.log(dataFuelConsumptionArray)
        console.log('CO2 Emissions ',dataFuelConsumptionArray.co2_emissions)
        var dataCO2Emissions = dataFuelConsumptionArray.co2_emissions;
        console.log('co2 Emissions ',dataCO2Emissions)
        var dataFuelConsumption = dataFuelConsumptionArray.total_fuel_consumed;
        dataFuelConsumption = dataFuelConsumption.toFixed(2)
        this.dataFuelConsumption = dataFuelConsumption 
        this.dataCO2Emissions = dataCO2Emissions.toFixed(2)
    }
    
  }
};

</script>

<style>
#mapApp {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 20px;
  /* height: 200vh;*/
  padding: 20px;
  align-self: flex-start;
}

#vesselInputBox {
  grid-column: 1;
  grid-row: 1;
  text-align: left;
  align-self: flex-start;
}

#vesselInputBox p{
  align-self: flex-start;
  grid-column: 1;
  grid-row: 1;
  transform: translateY(-15%);
}

#vesselInputBox form {
  grid-column: 1;
  grid-row: 1;
  text-align: left;
  align-self: flex-start;
    transform: translateY(-30%);

}

#dataContainer {
  grid-column: 1;
  grid-row: 2;
  text-align: left;
  align-self: flex-start;
    transform: translateY(-20%);

}
#map {
  grid-column: 2;
  grid-row: 1 / span 3; 
  width: 80vw;
  height: 100;
  min-width: 360px;
  text-align: center;
  align-self: start;
  padding-top: 0px;

  
  background-color: white;
}
#mapContainer {
  align-self: flex-start;
  height: 100%;
  width: 100%;
}
.right-aligned {
  float: right; 
}
</style>
