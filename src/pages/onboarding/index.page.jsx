import React, {
  useState, memo, useMemo, useCallback,
} from 'react';
import cn from 'classnames';

import Logo from 'public/images/logo.svg';

import SelectAction from './components/SelectAction';
import AddressForm from './components/AddressForm';
import Property from './components/Property';
import HomeChanges from './components/HomeChanges';
import UpdateProofs from './components/UpdateProofs';

import styles from './styles.module.css';

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState({ stepIndex: 0, substepIndex: 0 });

  const toNextSubstep = useCallback(() => {
    setActiveStep((oldActiveStep) => ({
      ...oldActiveStep,
      substepIndex: oldActiveStep.substepIndex + 1,
    }));
  }, []);

  const stepsContent = useMemo(() => ([
    {
      id: 1,
      title: 'In progress',
      substeps: [
        <SelectAction key="selectAction" onPressNext={toNextSubstep} />,
        <AddressForm key="addressForm" onSubmit={toNextSubstep} />,
        <Property key="property" onPressNext={toNextSubstep} />,
        <HomeChanges key="homeChanges" onPressNext={toNextSubstep} />,
        <UpdateProofs key="updateProofs" onPressNext={() => null} />,
      ],
    },
    {
      id: 2,
      title: 'Next step',
      substeps: [null],
    },
    {
      id: 3,
      title: 'Next step',
      substeps: [null],
    },
  ]), [toNextSubstep]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Logo className={styles.logo} />
        <p>HomeBase</p>
      </header>

      <main className={styles.content}>
        <div className={styles.stepsContainer}>
          {stepsContent.map(({ id, title }, index) => (
            <div
              key={id}
              className={cn(
                styles.stepContainer,
                index === activeStep.stepIndex && styles.activeStepContainer,
              )}
            >
              <div className={styles.stepNumber}>
                {index + 1}
              </div>
              {title}
            </div>
          ))}
        </div>

        {stepsContent[activeStep.stepIndex].substeps[activeStep.substepIndex]}
      </main>
    </div>
  );
};

export default memo(Onboarding);
