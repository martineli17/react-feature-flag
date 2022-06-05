/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import flagsmith from 'flagsmith';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const FlagContext = createContext<any>({});

function FlagContextProvider({ children }: any) {
    const [featureFlags, setFeatureFlags] = useState<any>({});

    const isEnabled = useCallback((key: string): boolean => {
        return featureFlags[key]?.enabled;
    }, [featureFlags]);

    const getFeatureFlagsFromLocalStorage = () => {
        const data = localStorage.getItem("FEATURE_FLAGS") || "{}";
        return JSON.parse(data);
    }

    useEffect(() => {
        flagsmith.init({
            environmentID: process.env.REACT_APP_FEATURE_FLAG_KEY,
            _trigger: () => {
                localStorage.removeItem("FEATURE_FLAGS");
                localStorage.setItem("FEATURE_FLAGS", JSON.stringify(flagsmith.getAllFlags()));
            },
        }).then();
        flagsmith.startListening(10000);
    }, []);

    useEffect(() => setFeatureFlags(getFeatureFlagsFromLocalStorage()), [location.href]);

    const contextValues = {
        isEnabled,
    }

    return (
        <FlagContext.Provider value={contextValues}>
            {children}
        </FlagContext.Provider>
    )
}

const useFlagContext = () => {
    const context = useContext(FlagContext);
    return context;
}

export { useFlagContext, FlagContextProvider };