import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

export default class TreeView extends Component {
  constructor(props) {
    super(props);
  }

  render(){
  	return(
  		<Tabs>
  			<TabList>
  				<Tab>Bacteria</Tab>
  				<Tab>Fungi</Tab>
  				<Tab>Plants</Tab>
  				<Tab>Animals</Tab>
  			</TabList>

  			<TabPanel>
  				<h2> Temporary Bacteria Place holder </h2>
  			</TabPanel>

  			<TabPanel>
  				<h2> Temporary Fungi Place holder </h2>
  			</TabPanel>

  			<TabPanel>
  				<h2> Temporary Plants Place holder </h2>
  			</TabPanel>

  			<TabPanel>
  				<Tabs>
  					<TabList>
  						<Tab>Vertabrates</Tab>
  						<Tab>Invertabrates</Tab>
  					</TabList>

  					<TabPanel>
  						<Tabs>
  							<TabList>
  								<Tab>Mammals</Tab>
  								<Tab>Avian</Tab>
  								<Tab>Reptiles</Tab>
  								<Tab>Amphibian</Tab>
  								<Tab>Fish</Tab>
  							</TabList>

  							<TabPanel>
  								<h2> Temporary Mammals Place holder </h2>
  							</TabPanel>

  							<TabPanel>
  								<h2> Temporary Avian Place holder </h2>
  							</TabPanel>

  							<TabPanel>
  								<h2> Temporary Reptiles Place holder </h2>
  							</TabPanel>

  							<TabPanel>
  								<h2> Temporary Amphibian Place holder </h2>
  							</TabPanel>

  							<TabPanel>
  								<h2> Temporary Fish Place holder </h2>
  							</TabPanel>
  						</Tabs>
  					</TabPanel>

  					<TabPanel>
  						<Tabs>
  							<TabList>
  								<Tab>Anthrop</Tab>
  								<Tab>Moluscs</Tab>
  								<Tab>Other</Tab>
  							</TabList>

  							<TabPanel>
  								<h2> Temporary Antrop Place holder </h2>
  							</TabPanel>

  							<TabPanel>
  								<h2> Temporary Moluscs Place holder </h2>
  							</TabPanel>

  							<TabPanel>
  								<h2> Temporary Other Place holder </h2>
  							</TabPanel>
  						</Tabs>
  					</TabPanel>
  				</Tabs>
  			</TabPanel>
  		</Tabs>
  	);
  }
}