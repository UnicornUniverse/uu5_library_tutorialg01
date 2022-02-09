import UuJokesCore from "uu_jokesg01-core";
import { shallow } from "uu5g05-test";

describe(`UuJokesCore.Joke.JokeDetail`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuJokesCore.Joke.Detail />);
    expect(wrapper).toMatchSnapshot();
  });
});
