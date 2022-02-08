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
import HomeExprectations from './components/HomeExpectations';

import RealtorImg from './images/realtor.png';

import styles from './styles.module.css';

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState({ stepIndex: 0, substepIndex: 0 });
  const [onboardingData, setOnboardingData] = useState({
    firstName: null,
    lastName: null,
    interestedIn: null,
    address: {
      line1: null,
      line2: null,
      city: null,
      state: null,
      zip: null,
    },
    homeExpectations: {
      field1: null,
      field2: null,
      field3: null,
      field4: null,
      field5: null,
    },
    changes: [],
    changesFiles: [],
  });

  const updateOnboardingData = useCallback((data) => {
    setOnboardingData({
      ...onboardingData,
      ...data,
    });
  }, [onboardingData]);

  const toNextSubstep = useCallback((data) => {
    updateOnboardingData(data);

    setActiveStep((oldActiveStep) => ({
      ...oldActiveStep,
      substepIndex: oldActiveStep.substepIndex + 1,
    }));
  }, [updateOnboardingData]);

  const onSaveUserData = useCallback(async (data) => {
    const updatedOnboardingData = {
      ...onboardingData,
      ...data,
    };

    try {
      // upload files
      if (updatedOnboardingData.changesFiles.length) {
        await Promise.all(updatedOnboardingData.changesFiles.map(async (file) => {
          // upload files to bucket
        }));
      }

      // update user
    } catch (e) {
      console.log(e);
    }

    updateOnboardingData(data);
  }, [onboardingData, updateOnboardingData]);

  const stepsContent = useMemo(() => {
    const stepsByInterest = onboardingData.interestedIn === 'Selling'
      ? [
        <AddressForm key="addressForm" onSubmit={toNextSubstep} />,
        <Property key="property" onPressNext={toNextSubstep} />,
        <HomeChanges key="homeChanges" onPressNext={toNextSubstep} />,
        <UpdateProofs key="updateProofs" onPressNext={onSaveUserData} />,
      ]
      : [
        <HomeExprectations key="homeExpectations" onPressNext={toNextSubstep} />,
        <HomeChanges key="homeChanges" onPressNext={onSaveUserData} />, // TODO: edit title
      ];

    return [
      {
        id: 1,
        title: 'In progress',
        substeps: [
          <SelectAction key="selectAction" onPressNext={toNextSubstep} />,
          ...stepsByInterest,
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
    ];
  }, [toNextSubstep, onSaveUserData, onboardingData.interestedIn]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo} />
          <p>WellNest</p>
        </div>
        <div className={styles.realtorContainer}>
          <img src={RealtorImg} alt="realtor" />
          <div>
            <p>Diana Smith</p>
            <p>Realtor® | Sunshine Brokers</p>
          </div>
        </div>
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
