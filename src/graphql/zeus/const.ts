/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	DATA_SOURCE_TYPE: "enum" as const,
	Query:{
		getCityParameters:{

		},
		getRealTimeParameters:{

		},
		getRealTimeWeather:{

		}
	}
}

export const ReturnTypes: Record<string,any> = {
	City:{
		country:"String",
		createdAt:"String",
		location:"PureLocation",
		name:"String",
		state:"String",
		stationsInCity:"Station"
	},
	Station:{
		city:"String",
		createdAt:"String",
		kind:"DATA_SOURCE_TYPE",
		parameters:"Parameters",
		stationId:"Int",
		updatedAt:"String"
	},
	Weather:{
		clouds:"Int",
		description:"String",
		feelTemp:"Float",
		humidity:"Int",
		main:"String",
		temp:"Float"
	},
	Mutation:{
		refreshStations:"String"
	},
	Query:{
		getCityParameters:"Station",
		getCollectedCities:"City",
		getRealTimeParameters:"Station",
		getRealTimeWeather:"Weather",
		test:"String"
	},
	PureLocation:{
		lat:"Float",
		long:"Float"
	},
	Parameters:{
		no2:"Float",
		no2Time:"String",
		o3:"Float",
		o3Time:"String",
		pm1:"Float",
		pm10:"Float",
		pm10Time:"String",
		pm25:"Float",
		pm25Time:"String",
		pm2p5:"Float",
		so2:"Float",
		so2Time:"String",
		time:"String"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}