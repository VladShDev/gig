import React, {useState} from 'react';

export function Wizard({children}) {

    const [currentStep, setCurrentStep] = useState(0);

    const steps = React.Children.toArray(children);

    const getStep = () => {
        let _step = steps.find((step, index) => index == currentStep);

        let step = React.cloneElement(_step, {
            next: () => {
                setCurrentStep(currentStep + 1)
            },
            back: ()=> {
                setCurrentStep(currentStep - 1)
            },
            skip: ()=> {
                setCurrentStep(currentStep + 1)
            },
            canNext: currentStep + 1 < steps.length,
            canBack: (_step.props.back !== false && currentStep > 0),
            canSkip: (_step.props.skip !== false)
        });
        return step;
    }

    return <div>
        {getStep()}
    </div>
}

export function Step(props) {

    const [loading, setLoading] = useState(false);

    const clickOnNext = () => {

        if (typeof props.onNext == 'undefined') {
            props.next();
            return false
        }
        setLoading(true);
        if (props.onNext() === true) {
            console.log('NEED GO TO NEXT');
            props.next();
        } else {
            console.log('DONT NEED GO TO NEXT');
        }
        setLoading(false);
    }

    const clickOnBack = ()=> {
        props.back();
    }

    const clickOnSkip = ()=> {
        props.skip();
    }

    return <div>
        {props.children}

        {loading ? <div>loading</div> : null}
        <div className="buttons">
            {props.canBack ? <button onClick={e => clickOnBack()}>back</button> : null}
            <button onClick={e => clickOnNext()}>next</button>
            {props.canSkip ? <button onClick={e => clickOnSkip()}>skip</button> : null}
        </div>
    </div>
}