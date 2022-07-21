import { useState, useEffect, useRef } from "react";

const OverScan = ({ ovrScn, setOvrScn, setMenuHover }) => {
    const [select, setSelect] = useState(0);
    const [saved, setSaved] = useState(false); 
    const selected = useRef(0)
    //this ensures that the main menu options never change while a sub menu is open
    setMenuHover(4);
    const update = (mod) => {
        //update the state of overscan and shift
        switch (selected.current) {
            case 0:
                setOvrScn(old => ({ ...old, horSize: parseFloat((old.horSize + (.01 * mod)).toPrecision(3)) }))
                break;
            case 1:
                setOvrScn(old => ({ ...old, vertSize: parseFloat((old.vertSize + (.01 * mod)).toPrecision(3)) }))
                break;
            case 2:
                setOvrScn(old => ({ ...old, horShift: (old.horShift + mod) }))
                break;
            case 3:
                setOvrScn(old => ({ ...old, vertShift: (old.vertShift + mod) }))
                break;
            case 4:
                //if save is selected save ovrScn state to localStorage
                //On page close or refresh, Home will save localStorage back to the server
                //Mod must be 0. This prevents left or right keys from triggering this switch
                if (!mod) {
                    console.log("SAVING LOCALLY...")
                    let data = JSON.parse(localStorage.getItem('TubeSimData'));
                    //needed to get current state but limited by using default DOM eventListener
                    let newOs = {};
                    setOvrScn(old => {
                        newOs = old
                        return old
                    })

                    data = {
                        ...data,
                        horSize: newOs.horSize,
                        vertSize: newOs.vertSize,
                        horShift: newOs.horShift,
                        vertShift: newOs.vertShift
                    };
                    console.log(newOs)

                    localStorage.setItem('TubeSimData', JSON.stringify(data));
                };
                //set saved to true to change Save to Saved to indicate success
                setSaved(true);
                //set timeout to reset saved sate in case user makes more adjustments
                setTimeout(() => setSaved(false), 5000)
                break;
            default:
        }
    }
    const logKeyUp = (e) => {

        switch (e.key) {

            case ".":
                //this removes the event listener and sets the ovrScn state to what is stored in localStorage
                //if the user selected Save, then localStorage should be updated and this will make no visual change
                document.removeEventListener("keyup", logKeyUp)
                const data = JSON.parse(localStorage.getItem('TubeSimData'));
                setOvrScn(
                    {
                        horSize: data.horSize,
                        vertSize: data.vertSize,
                        horShift: data.horShift,
                        vertShift: data.vertShift
                    }
                )
                break;
            case "ArrowUp":
                setSelect(last => {
                    const next = (last === 0) ? (4) : (last - 1);
                    selected.current = next;
                    return next
                })
                break;
            case "ArrowDown":
                setSelect(last => {
                    const next = (last === 4) ? (0) : (last + 1);
                    selected.current = next;
                    return next
                })
                break;
            case "ArrowLeft":
                update(-1);
                break;
            case "ArrowRight":
                update(1);
                break;
            case "Enter":
                //must send 0 to trigger save 
                update(0);
                break;
            default:
        }
    }
    useEffect(() => {
        document.addEventListener("keyup", logKeyUp);
    }, [])

    return (
        <div className="menuBackdrop" id="overscanMenu">
            <p className={`osOption ${(select === 0) ? ('osSelected') : ('')}`} >{`H Overscan: ${ovrScn.horSize}`}</p>
            <p className={`osOption ${(select === 1) ? ('osSelected') : ('')}`}>{`V Overscan: ${ovrScn.vertSize}`}</p>
            <p className={`osOption ${(select === 2) ? ('osSelected') : ('')}`}>{`H Shift: ${ovrScn.horShift}`}</p>
            <p className={`osOption ${(select === 3) ? ('osSelected') : ('')}`}>{`V Shift: ${ovrScn.vertShift}`}</p>
            <p className={`osOption ${(select === 4) ? ('osSelected') : ('')}`}>{`${(saved) ? ('Saved') : ('Save') }`}</p>
        </div>
    )
}

export default OverScan;