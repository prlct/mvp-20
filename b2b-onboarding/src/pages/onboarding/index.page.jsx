import React, {
  useState, memo, useMemo, useCallback,
} from 'react';
import cn from 'classnames';

import Logo from 'public/images/logo.svg';

import { supabase } from 'b2b-onboarding-supabase/utils/supabaseClient';

import SelectAction from './components/SelectAction';
import AddressForm from './components/AddressForm';
import Property from './components/Property';
import HomeChanges from './components/HomeChanges';
import UpdateProofs from './components/UpdateProofs';

import styles from './styles.module.css';

const Onboarding = () => {
  const user = supabase.auth.user();

  const [activeStep, setActiveStep] = useState({ stepIndex: 0, substepIndex: 0 });
  const [onboardingData, setOnboardingData] = useState({
    interestedIn: null,
    address: {
      line1: null,
      line2: null,
      city: null,
      state: null,
      zip: null,
    },
    changes: [],
    changesFiles: [],
  });

  const toNextSubstep = useCallback((data) => {
    setOnboardingData({
      ...onboardingData,
      ...data,
    });

    setActiveStep((oldActiveStep) => ({
      ...oldActiveStep,
      substepIndex: oldActiveStep.substepIndex + 1,
    }));
  }, [onboardingData]);

  const onSaveUserData = useCallback(async (data) => {
    const updatedOnboardingData = {
      ...onboardingData,
      ...data,
    };
    setOnboardingData(updatedOnboardingData);

    try {
      // upload files
      if (updatedOnboardingData.changesFiles.length) {
        await Promise.all(updatedOnboardingData.changesFiles.map(async (file) => {
          const { error: uploadError } = await supabase.storage
            .from('houses-images')
            .upload(`${user.id}/${file.name}`, file);
          if (uploadError) throw uploadError;
        }));
      }

      // update user
      const { error } = await supabase.auth.update({
        data: {
          houseInfo: {
            interestedIn: updatedOnboardingData.interestedIn,
            address: updatedOnboardingData.address,
            changes: updatedOnboardingData.changes,
            changesFilesUrls: updatedOnboardingData.changesFiles.map((file) => `${user.id}/${file.name}`),
          },
        },
      });
      if (error) throw error;
    } catch (e) {
      alert(e.error_description || e.message);
    }
  }, [user, onboardingData]);

  const stepsContent = useMemo(() => ([
    {
      id: 1,
      title: 'In progress',
      substeps: [
        <SelectAction key="selectAction" onPressNext={toNextSubstep} />,
        <AddressForm key="addressForm" onSubmit={toNextSubstep} />,
        <Property key="property" onPressNext={toNextSubstep} />,
        <HomeChanges key="homeChanges" onPressNext={toNextSubstep} />,
        <UpdateProofs key="updateProofs" onPressNext={onSaveUserData} />,
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
  ]), [toNextSubstep, onSaveUserData]);

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
