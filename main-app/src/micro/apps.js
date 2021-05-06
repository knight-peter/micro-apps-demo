const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);

const apps = [
  {
    name: "VueMicroApp",
    entry: "//localhost:10200",
    container: "#frame",
    activeRule: getActiveRule("#/vue"),
  },
  {
    name: "VueMicroAppDemo",
    entry: "//localhost:10201",
    container: "#frame",
    activeRule: getActiveRule("#/test"),
  },
];

export default apps;
