/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Query:{
		getCityParameters:{

		},
		getRealTimeParameters:{

		},
		getRealTimeWeather:{

		}
	},
	DATA_SOURCE_TYPE: "enum" as const
}

export const ReturnTypes: Record<string,any> = {
	Mutation:{
		refreshStations:"String"
	},
	Weather:{
		clouds:"Int",
		description:"String",
		feelTemp:"Float",
		humidity:"Int",
		main:"String",
		temp:"Float"
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
	},
	PureLocation:{
		lat:"Float",
		long:"Float"
	},
	Station:{
		city:"String",
		createdAt:"String",
		kind:"DATA_SOURCE_TYPE",
		parameters:"Parameters",
		stationId:"Int",
		updatedAt:"String"
	},
	Query:{
		getCityParameters:"Station",
		getCollectedCities:"City",
		getRealTimeParameters:"Station",
		getRealTimeWeather:"Weather",
		test:"String"
	},
	City:{
		country:"String",
		createdAt:"String",
		location:"PureLocation",
		name:"String",
		state:"String",
		stationsInCity:"Station"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}