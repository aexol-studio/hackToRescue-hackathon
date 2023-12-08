/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Query:{
		getCityParameters:{

		},
		getIndexForCity:{

		},
		getRealTimeParameters:{

		},
		getRealTimeWeather:{

		}
	},
	DATA_SOURCE_TYPE: "enum" as const
}

export const ReturnTypes: Record<string,any> = {
	PureLocation:{
		lat:"Float",
		long:"Float"
	},
	Mutation:{
		refreshStations:"String"
	},
	Query:{
		getCityParameters:"Station",
		getCollectedCities:"City",
		getIndexForCity:"Float",
		getRealTimeParameters:"Station",
		getRealTimeWeather:"Weather",
		test:"String"
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
		gustSpeed:"Float",
		humidity:"Int",
		main:"String",
		pressure:"Float",
		temp:"Float",
		windDeg:"Int",
		windSpeed:"Float"
	},
	City:{
		country:"String",
		createdAt:"String",
		location:"PureLocation",
		name:"String",
		state:"String",
		stationsInCity:"Station"
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