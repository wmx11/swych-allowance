import { Container, Divider, Paper, Text } from '@mantine/core';
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from '@thirdweb-dev/react';
import Image from 'next/image';
import Link from 'next/link';
import StepOne from 'public/images/1.png';
import StepTwo from 'public/images/2.png';
import StepThree from 'public/images/3.png';
import StepFour from 'public/images/4.png';
import { useEffect, useState } from 'react';
import erc20Abi from '../utils/erc20.abi.json';

export default function Home() {
  const [allowanceValue, setAllowanceValue] = useState(0);
  const [balanceValue, setBalanceValue] = useState(0);

  const address = useAddress();

  const { contract } = useContract(
    '0x9334e37faD7c41Cd6C9565Bff3A97CE31CEE52a3',
    erc20Abi
  );

  const { data: balance } = useTokenBalance(contract, address);

  const {
    data: allowance,
    isLoading,
    error,
  } = useContractRead(
    contract,
    'allowance',
    address,
    '0x00e0a3f755f88c7ac755949742bd0d1c0286b756'
  );

  useEffect(() => {
    if (address && allowance) {
      setAllowanceValue(parseInt(allowance?.toString().substring(0, 9), 10));
    }

    if (address && balance) {
      setBalanceValue(parseFloat(balance.displayValue));
    }
  }, [address, allowance, balance]);

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center">
        <Container className="py-10 w-full" size="sm">
          <Paper shadow="xl" p="xl" withBorder className="mb-8 w-full">
            <div className="text-xl mb-4">
              <div className="flex justify-between flex-wrap gap-x-4">
                <Text weight={700} color="dimmed">
                  Swych Balance:
                </Text>
                <Text weight={700}>
                  {balanceValue ? balanceValue?.toLocaleString() : '0.00'}
                </Text>
              </div>
              <div className="flex justify-between flex-wrap gap-x-4">
                <Text weight={700} color="dimmed">
                  Swych Allowance:
                </Text>
                <Text weight={700}>
                  {allowanceValue ? allowanceValue?.toLocaleString() : '0.00'}
                </Text>
              </div>
              {address ? (
                <div className="flex justify-between flex-wrap gap-x-4">
                  <Text weight={700} color="dimmed">
                    Will you be able to stake?:
                  </Text>
                  {balanceValue > allowanceValue ? (
                    <Text weight={700}>No</Text>
                  ) : (
                    <Text weight={700}>Yes</Text>
                  )}
                </div>
              ) : null}
            </div>

            <ConnectWallet
              accentColor="blue"
              className="rounded-xl bg-blue-500 border-none"
            />
          </Paper>

          {address ? (
            <Paper shadow="xl" p="xl" withBorder className="mb-8 w-full">
              <Text weight={700} color="dimmed" className="text-xl">
                Options
              </Text>
              <Divider className="my-4" />
              <div className="mb-4">
                <Web3Button
                  className="rounded-xl border-none bg-teal-500"
                  contractAbi={erc20Abi}
                  contractAddress="0x9334e37faD7c41Cd6C9565Bff3A97CE31CEE52a3"
                  action={async (c) => {
                    await c.call(
                      'approve',
                      '0x00e0a3f755f88c7ac755949742bd0d1c0286b756',
                      '100000000000000000000000000'
                    );
                  }}
                >
                  Increase Allowance
                </Web3Button>
              </div>
              <div>
                <Web3Button
                  className="rounded-xl border-none bg-red-500"
                  contractAbi={erc20Abi}
                  contractAddress="0x9334e37faD7c41Cd6C9565Bff3A97CE31CEE52a3"
                  action={async (c) => {
                    await c.call(
                      'approve',
                      '0x00e0a3f755f88c7ac755949742bd0d1c0286b756',
                      '0'
                    );
                  }}
                >
                  Revoke Allowance
                </Web3Button>
              </div>
              <Divider className="my-4" />
              <Paper shadow="xl" p="xl" withBorder className="mb-8 w-full">
                <Text weight={700} color="dimmed" className="text-xl mb-4">
                  Increasing Allowance for MetaMask Users
                </Text>

                <Text className="mb-4">
                  If you are having issues staking on Swych, you may need to
                  increase your Swych Allowance.
                </Text>

                <div className="flex flex-col gap-4">
                  <Text>
                    1. Select the option <strong>Increase Allowance </strong>
                    above.
                  </Text>
                  <div>
                    <Text className="mb-2">
                      2. A MetaMask prompt will open for you
                    </Text>
                    <Image src={StepOne} alt="Step 1" width={250} />
                  </div>
                  <div>
                    <Text className="mb-2">
                      3. Select the <strong>Use Default</strong> option
                    </Text>
                    <Image src={StepTwo} alt="Step 1" width={250} />
                  </div>
                  <div>
                    <Text className="mb-2">
                      4. Click <strong>Next</strong>
                    </Text>
                    <Image src={StepThree} alt="Step 1" width={250} />
                  </div>
                  <div>
                    <Text className="mb-2">
                      5. Click <strong>Approve</strong>
                    </Text>
                    <Image src={StepFour} alt="Step 1" width={250} />
                  </div>
                  <Text>
                    6. Go to Swych and start <strong>Staking</strong>
                  </Text>
                </div>
              </Paper>
              <Link href="https://discord.gg/narwvstAYP">
                <Text
                  color="blue"
                  align="center"
                  weight={700}
                  className="text-xl"
                >
                  If you are still experiencing issues or have any questions,
                  please reach out to us on Discord by clicking here.
                </Text>
              </Link>
            </Paper>
          ) : null}
        </Container>
      </main>
    </>
  );
}
