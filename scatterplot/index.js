function App() {
    const [cyclistData, setCyclistData] = React.useState([]);
    
    React.useEffect(()=> {
        async function fetchData() {
            const response = await fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
            const data = await response.json();
            console.log(data);
            setCyclistData(data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <BarChart data={cyclistData}/>
        </div>
    )


};

function BarChart({data}){
    const [height, setHeight] = React.useState(500)
    const [width, setWidth] = React.useState(840)

    React.useEffect(()=> {
        createBarChart()
    }, [data]);


    const createBarChart = () => {
        let x = d3.scaleLinear().range([0, width]);
        x.domain([
            d3.min(data, (d) => d.Year -1),
            d3.max(data, (d) => d.Year +1),
        ]);

        var y = d3.scaleTime().range([0, height]);
        data.forEach(function(d) {
            d.Place = +d.Place;
            var parsedTime = d.Time.split(":")
            d.Time = new Date(Date.UTC(1970,0,1,0, parsedTime[0], parsedTime[1]));

        });
        y.domain(d3.extent(data, (d)=> d.Time));
        
        let timeFormat = d3.timeFormat("%M:%S")

        let xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
        let yAxis = d3.axisLeft(y).tickFormat(timeFormat);

        let div = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .attr("id","tooltip")
        .style("opacity", 0);

        let svg= d3
        .select("svg")
        .attr("width", width + 80)
        .attr("height", height + 130)
        .attr("class", "graph")
        .append("g")
        .attr("transform", "translate(" + 60 + "," + 100 + ")");

        svg
        .append("g")
        
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))