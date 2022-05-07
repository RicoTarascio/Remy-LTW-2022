import Nutrition from "./nutrition";

interface Pet {
  species: string,
  name: string;
  breed: string;
  meals: Nutrition[];
}

export default Pet;
