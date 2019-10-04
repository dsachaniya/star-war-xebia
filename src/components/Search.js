import React, { Component } from "react";
import {
	Container,
	Col,
	Input,
	Row,
	Card,
	CardBody,
	CardTitle,
	CardText,
	InputGroup,
	ListGroup,
	Progress,
	Button,
	InputGroupAddon,
	Collapse
} from "reactstrap";
import { getPlanetLists } from "../redux/requests";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			planets: [],
			totalPopulation: 0,
			showModal: false,
			activeName: ""
		};
	}
	componentDidMount() {
		this.searchPlaces("", true);
	}

	searchPlaces = async (serch, defaultCall) => {
		const searchKeyword = serch.trim();
		if (searchKeyword || defaultCall) {
			const res = await getPlanetLists(searchKeyword);
			if (res) {
				this.setState({ planets: res });
				let totalPopulation = 0;
				if (res.length) {
					for (let i = 0; i < res.length; i++) {
						const element = res[i];
						if (
							element.population &&
							element.population !== "unknown"
						) {
							totalPopulation += parseInt(element.population);
						}
					}
				}

				this.setState({ totalPopulation: totalPopulation });
				return null;
			}
		} else {
			this.setState({ planets: [] });
			return null;
		}
	};

	toggle = () => {
		this.setState(prevState => ({
			showModal: !prevState.showModal
		}));
	};

	onClickViewDetails = planet => {
		this.setState({
			activeName: planet.name
		});
		this.toggle();
	};

	renderPlanets = planets => {
		const { activeName } = this.state;
		const usablePlanets = planets.filter(
			planet =>
				planet.name !== "unknown" && planet.population !== "unknown"
		);
		const { totalPopulation } = this.state;
		usablePlanets.sort(
			(a, b) => parseFloat(b.population) - parseFloat(a.population)
		);
		return usablePlanets.map(planet => {
			const percentage = (
				(planet.population * 100) /
				totalPopulation
			).toFixed(3);
			return (
				<Card key={planet.name} className="mt-2">
					<CardBody>
						<CardTitle style={{ marginBottom: 4, fontSize: 24 }}>
							<b>{planet.name}</b>
						</CardTitle>
						<CardText style={{ marginBottom: 2 }}>
							Planet Population: <b>{planet.population}</b>
							<br />
							Total Percentage of total population:{" "}
							<b>{percentage}%</b>
						</CardText>
						<Progress
							value={Math.ceil(percentage)}
							style={{ marginTop: 4 }}
						/>
						<button
							className="btn btn-info mt-2"
							onClick={() =>
								this.onClickViewDetails(planet, planet.name)
							}
							key={`${planet.name}${planet.surface_water}`}
						>
							View Details
						</button>
						<Collapse
							isOpen={activeName === planet.name}
							key={planet.name}
							className="mt-3"
						>
							<Card>
								<CardBody>
									<table>
										<tbody>
											<tr>
												<th>Name</th>
												<td>{planet.name}</td>
											</tr>
											<tr>
												<th>Surface Water (in %)</th>
												<td>{planet.surface_water}</td>
											</tr>
											<tr>
												<th>Gravity</th>
												<td>{planet.gravity}</td>
											</tr>
											<tr>
												<th>Orbital Period</th>
												<td>{planet.orbital_period}</td>
											</tr>
											<tr>
												<th>Diameter</th>
												<td>{planet.diameter}</td>
											</tr>
											<tr>
												<th>Population</th>
												<td>{planet.population}</td>
											</tr>
										</tbody>
									</table>
								</CardBody>
							</Card>
						</Collapse>
					</CardBody>
				</Card>
			);
		});
	};

	render() {
		const { planets } = this.state;
		return (
			<Container>
				<Row>
					<Col></Col>
				</Row>
				<Row>
					<Col xs="0" sm="1"></Col>
					<Col xs="12" sm="10" md="10">
						<InputGroup>
							<Input
								type="text"
								name="searchKeyword"
								placeholder={"Search For Planets"}
								onChange={e =>
									this.searchPlaces(e.target.value)
								}
							/>
							<InputGroupAddon addonType="append">
								<Button color="secondary">Search</Button>
							</InputGroupAddon>
						</InputGroup>
					</Col>
					<Col sm="4"></Col>
				</Row>
				<br />
				<Row>
					<Col xs="0" sm="1" md="1"></Col>
					<Col xs="12" sm="10" md="10">
						<ListGroup>{this.renderPlanets(planets)}</ListGroup>
					</Col>
					<Col xs="0" sm="1" md="1"></Col>
				</Row>
			</Container>
		);
	}
}

export default Search;
