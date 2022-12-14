import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Greeter', {
    from: deployer,
    args: ['Hello, world!'],
    log: true,
  });
};

export default func;
