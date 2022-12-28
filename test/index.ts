import { expect } from 'chai';
import { Contract } from 'ethers';
import { deployments, ethers } from 'hardhat';

async function getDeployedContract<T extends Contract>(name: string): Promise<T> {
  const { get } = deployments;
  const c = await get(name);
  return (await ethers.getContractAt(name, c.address)) as T;
}

describe('Greeter', function () {
  it("Should return the new greeting once it's changed", async function () {
    const greeter = await getDeployedContract('Greeter');
    expect(await greeter.greet()).to.equal('Hello, world!');

    const setGreetingTx = await greeter.setGreeting('Hola, Tom!');

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal('Hola, Tom!');
  });
});
