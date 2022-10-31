interface IFlight {
    ID: number,
    'carrierID.IATA': string,
    fltNo: number,
    term: string,
    'airportToID.name_en': string,
    'airportFromID.name_en': string,
    timeDepSchedule: Date,
    timeTakeOfFact: Date,
    timeLandFact: Date,
    timeToStand: Date,
    status: string,
    airline: {
        en: {
            name: string,
            logoSmallName: string
        }
    }
}

type FlightState = {
    flights: {
        arrival: IFlight[],
        departure: IFlight[]
    },
    date: Date
}

type FlightAction = {
    type: string
    payload: any
}

type DispatchType = (args: FlightAction) => FlightAction