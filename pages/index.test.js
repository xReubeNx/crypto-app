import { getCoins } from "./api/hello";
import axios from "axios";

jest.mock("axios");

describe("The get request should be able to return data or an error.", () => {
  test("getCoins should get all of the coins.", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: "coin id 1",
          name: "coin name 1",
          symbol: "coin symbol 1",
        },
        {
          id: "coin id 2",
          name: "coin name 2",
          symbol: "coin symbol 2",
        },
      ],
    });
    const { data } = await getCoins();
    expect(data[0].name).toBe("coin name 1");
    expect(data[1].symbol).toBe("coin symbol 2");
  });

  test("getCoins should return 'Error' when there is an error.", async () => {
    axios.get.mockRejectedValue(new Error("This is a random error message"));
    const { data } = await getCoins();
    expect(data).toBe("Error");
  });
});
