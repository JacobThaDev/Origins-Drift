export interface CarsDetailsTypes {
    id: number;
    make: string;
    model: string;
    year: number;
    rarity: string;
    price: number;
    speed: number;
    handling: number;
    acceleration: number;
    launcher: number;
    braking: number;
    offroad: number;
    car_class: string;
    rating: number;
    country: string;
    car_type:string;
    build_type: string;
    powertrain_type: string;
    electric_motors: number;
    engine_size: number;
    aspiration: string;
    engine_type:string;
    power: number;
    torque: number;
    engine_placement: string;
    drivetrain: string;
    gears: number;
    weight: number;
    weight_dsitribution: number;
    b60:number; // braking 60-0
    b100: number; // braking 100-0
    g60: number;
    g120: number;
    a60: number; // acceleration 0-60
    a100: number; // acceleration 0-100
    top_speed: number;
}