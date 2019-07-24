import { scrollToTop } from './helpers/scrollToTop';
import { addNewDeploymentEvents } from './newDeploymentEvents';

export const renderCreateDeployment = () => {

    //reset scroll postiion of main-content component
    scrollToTop(); 

    //render the create deployment form html
    const main = document.getElementById('main-content')
    main.innerHTML = `
        <form id="new-deployment__form">
            <h1 class="title">New deployment</h1>
            <span class="select-product">Select your XProtect&reg; product:</span>
            <div class="radio-tile-group">
                <div class="input-container">
                    <input id="essential-plus" class="radio-button" type="radio" name="radio" value="1" required />
                    <div class="radio-tile">
                        <div class="icon" id="essential-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 242.18 178.57" width="100%" height="100%">
                                <path d="M347.48,213.35c3.19-.9,5.36-2.56,5.36-4.48v-6.72c-2-4.46-7.09-9.65-13.43-14.71a132.59,132.59,0,0,0-11.29-8v-9.71a7.06,7.06,0,0,0-7-7.1h-9.52v-11c0-3.77-2.6-6.82-5.82-6.82h-148c-3.22,0-5.83,3.05-5.83,6.82v11h-9.51a7.07,7.07,0,0,0-7,7.1v9.71a134.2,134.2,0,0,0-11.29,8c-6.35,5.06-11.42,10.25-13.44,14.71v6.72c0,2.87,4.74,5.18,10.59,5.18s10.59-2.31,10.59-5.18v-6.72h8.79V323.33H313V213.94c4.74-.52,8.31-2.59,8.31-5.07v-6.72h10.41v6.72c0,2.87,4.74,5.18,10.57,5.18l.49,0M228.28,300.57H156.85v-86.9c3.85-.8,6.54-2.62,6.54-4.8v-3.61h10.42v3.61c0,2.87,4.73,5.18,10.58,5.18S195,211.74,195,208.87v-3.61h10.42v3.61c0,2.87,4.72,5.18,10.57,5.18s10.58-2.31,10.58-5.18v-3.61h1.74Zm70.13,16.1H255.36V274.73h43.05ZM255.36,267V212.34c1.7-.92,2.75-2.12,2.75-3.47v-6.72h10.42v6.72c0,2.87,4.74,5.18,10.57,5.18s10.6-2.31,10.6-5.18v-6.72h8.71V267Z" 
                                    transform="translate(-110.65 -144.76)"/>
                            </svg>
                        </div>
                        <label for="Essential+" class="radio-tile-label">Essential+</label>
                    </div>
                </div>
                <!--radio-input-->
                <div class="input-container">
                    <input id="express-plus" class="radio-button" type="radio" name="radio" value="2" required />
                    <div class="radio-tile">
                        <div class="icon" id="express-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252.19 162.46" width="100%" height="100%">
                                <path d="M231.88,234.05" transform="translate(-105.79 -152.82)" />
                                <path d="M231.88,234.05" transform="translate(-105.79 -152.82)" />
                                <path d="M131.05,233.19h86.71v63.22H131.05Zm112.25,0H330v63.22H243.3Zm-53.39-51.45H174.34l.06,10.7H105.79V315.28H358V192.44H345V181.57H331.26l-70.64-28.75Z"
                                    transform="translate(-105.79 -152.82)" />
                            </svg>
                        </div>
                        <label for="Express+" class="radio-tile-label">Express+</label>
                    </div>
                </div>
                <!--radio-input-->
                <div class="input-container">
                    <input id="professional-plus" class="radio-button" type="radio" name="radio" value="3" required />
                    <div class="radio-tile">
                        <div class="icon" id="professional-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.15 208.8" width="100%" height="85%">
                                <rect y="78.46" width="17.01" height="91.44" />
                                <rect x="37.81" y="78.46" width="16.98" height="91.44" />
                                <rect x="75.58" y="78.46" width="16.99" height="91.44" />
                                <rect x="113.36" y="78.46" width="17" height="91.44" />
                                <rect x="151.15" y="78.46" width="17" height="91.44" />
                                <polygon points="83.48 0 0 51.11 166.94 51.11 83.48 0" />
                                <rect y="55.44" width="168.15" height="17.13" />
                                <rect y="174.59" width="168.15" height="11.21" />
                                <rect y="191.7" width="168.14" height="17.1" />
                            </svg>
                        </div>
                        <label for="Professional+" class="radio-tile-label">Professional+</label>
                    </div>
                </div>
                <!--radio-input-->
                <div class="input-container">
                    <input id="expert" class="radio-button" type="radio" name="radio" value="4" required />
                    <div class="radio-tile">
                        <div class="icon" id="expert-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288.69 169.86" width="100%" height="100%">
                                <path d="M232.22,233.26" transform="translate(-87.87 -148.33)" />
                                <path d="M232.22,233.26" transform="translate(-87.87 -148.33)" />
                                <path d="M291.12,192.62H271.7V167.91a84.53,84.53,0,0,1,19.42,6.75Zm0,38.83H271.7V201.68h19.42Zm0,37.55H271.7V239.22h19.42Zm0,40.13H271.7V276.77h19.42ZM265.23,192.62H247.11v-29a125.62,125.62,0,0,1,18.12,2.85Zm0,38.83H247.1V201.68h18.13Zm0,37.55H247.1V239.22h18.13Zm0,40.13H247.1V276.77h18.13Zm-23.3-116.51H222.51V163.14c2.59-.17,6.52-.26,9.66-.26s5.87.09,9.76.26Zm0,38.83H222.51V201.68h19.42Zm0,37.55H222.51V239.22h19.42ZM216,192.62H197.91v-26.2A125.69,125.69,0,0,1,216,163.58Zm0,38.83H197.91V201.68H216ZM216,269H197.91V239.22H216Zm0,40.13H197.91V276.77H216ZM191.44,192.62H172v-18a172.73,172.73,0,0,1,19.42-6.73Zm0,38.83H172V201.68h19.42Zm0,37.55H172V239.22h19.42Zm0,40.13H172V276.77h19.42Zm-46.61-60.84h10.36V269H144.83Zm0-25.9h10.36v19.42H144.83Zm-24.59,25.9h10.35V269H120.24Zm0-25.9h10.35v19.42H120.24Zm-24.6,25.9H106V269H95.64Zm0-25.9H106v19.42H95.64Zm262.8,25.9H368.8V269H358.44Zm0-25.9H368.8v19.42H358.44Zm-24.6,25.9H344.2V269H333.84Zm0-25.9H344.2v19.42H333.84Zm-24.59,25.9H319.6V269H309.25Zm0-25.9H319.6v19.42H309.25Zm59.55,86.74V283.24H297.6v-6.47h77.67V214.63H297.6V177.91a61.16,61.16,0,0,1,7,5l9.15-11.24C296,157.05,265.41,148.33,232,148.33S168.19,157,150.4,171.57l9.24,11.26a62,62,0,0,1,7.2-5v36.77h-44V195.21h19.42V177.08H99.52v18.13h16.83v19.42H89.17v62.14h77.67v6.47H95.64v25.89H87.87v9.06H222.51V276.77h19.42v41.42H376.56v-9.06Z"
                                    transform="translate(-87.87 -148.33)" />
                            </svg>
                        </div>
                        <label for="Expert" class="radio-tile-label">Expert</label>
                    </div>
                </div>
                <!--radio-input-->
                <div class="input-container">
                    <input id="corporate" class="radio-button" type="radio" name="radio" value="5" required />
                    <div class="radio-tile">
                        <div class="icon" id="corporate-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="80%" viewBox="0 0 220.76 191.19">
                                <path d="M304.53,326.43" transform="translate(-121.89 -127.6)" />
                                <path d="M313,161.92v-9.64c-.5,0-1,0-1.5.05v-8.5H308.1v-6.42h-29v6.42h-3.35v9l-1.68-.09V225H269v-6h-6.87v-2.45h1.13c1.25,0,2.26-.71,2.26-1.56a1.61,1.61,0,0,0-1.27-1.4,1.41,1.41,0,0,0,0-2.8,1.62,1.62,0,0,0,1.27-1.4c0-.86-1-1.55-2.26-1.55h-1.35l-15.5-23.43-15.49,23.43h-1.35c-1.25,0-2.26.69-2.26,1.55a1.63,1.63,0,0,0,1.28,1.4,1.41,1.41,0,0,0,0,2.8,1.62,1.62,0,0,0-1.28,1.4c0,.85,1,1.56,2.26,1.56h1.15V219h-6.88v6h-5.19v-4.29h-9v-4.46H176.6v4.46h-3.68V150.39h-9v-7.66H148.57V127.6h-2.33v15.13H130.86v7.66h-9v168.4H342.64V161.92ZM135.91,299.38h-6.74v-6.56h6.74Zm0-10.39h-6.74v-6.56h6.74Zm0-10.39h-6.74V272h6.74Zm0-10.38h-6.74v-6.56h6.74Zm0-10.39h-6.74v-6.57h6.74Zm0-10.39h-6.74v-6.56h6.74Zm0-10.38h-6.74V230.5h6.74Zm0-10.39h-6.74v-6.58h6.74Zm0-10.4h-6.74v-6.55h6.74Zm0-10.39h-6.74v-6.56h6.74Zm0-10.38h-6.74v-6.57h6.74Zm0-10.39h-6.74v-6.56h6.74Zm0-10.39h-6.74v-6.56h6.74Zm0-10.67h-6.74V157.5h6.74Zm10,135.33h-6.73v-6.56h6.73Zm0-10.39h-6.73v-6.56h6.73Zm0-10.39h-6.73V272h6.73Zm0-10.38h-6.73v-6.56h6.73Zm0-10.39h-6.73v-6.57h6.73Zm0-10.39h-6.73v-6.56h6.73Zm0-10.38h-6.73V230.5h6.73Zm0-10.39h-6.73v-6.58h6.73Zm0-10.4h-6.73v-6.55h6.73Zm0-10.39h-6.73v-6.56h6.73Zm0-10.38h-6.73v-6.57h6.73Zm0-10.39h-6.73v-6.56h6.73Zm0-10.39h-6.73v-6.56h6.73Zm0-10.67h-6.73V157.5h6.73Zm10,135.33h-6.72v-6.56h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.39h-6.72V272h6.72Zm0-10.38h-6.72v-6.56h6.72Zm0-10.39h-6.72v-6.57h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.38h-6.72V230.5h6.72Zm0-10.39h-6.72v-6.58h6.72Zm0-10.4h-6.72v-6.55h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.38h-6.72v-6.57h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.67h-6.72V157.5h6.72Zm10,135.33h-6.72v-6.56h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.39h-6.72V272h6.72Zm0-10.38h-6.72v-6.56h6.72Zm0-10.39h-6.72v-6.57h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.38h-6.72V230.5h6.72Zm0-10.39h-6.72v-6.58h6.72Zm0-10.4h-6.72v-6.55h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.38h-6.72v-6.57h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.39h-6.72v-6.56h6.72Zm0-10.67h-6.72V157.5h6.72Zm15.73,143.44H174.9v-3.83h6.73Zm0-6.06H174.9v-3.82h6.73Zm0-6H174.9v-3.82h6.73Zm0-6H174.9v-3.83h6.73Zm0-6.05H174.9v-3.83h6.73Zm0-6.06H174.9v-3.83h6.73Zm0-6.05H174.9v-3.82h6.73Zm0-6.05H174.9v-3.82h6.73Zm0-6H174.9v-3.83h6.73Zm0-6.05H174.9v-3.84h6.73Zm0-6.05H174.9v-3.82h6.73Zm0-6.05H174.9v-3.82h6.73Zm0-6H174.9v-3.81h6.73Zm0-6.21H174.9v-3.82h6.73Zm10,78.8H184.9v-3.83h6.73Zm0-6.06H184.9v-3.82h6.73Zm0-6H184.9v-3.82h6.73Zm0-6H184.9v-3.83h6.73Zm0-6.05H184.9v-3.83h6.73Zm0-6.06H184.9v-3.83h6.73Zm0-6.05H184.9v-3.82h6.73Zm0-6.05H184.9v-3.82h6.73Zm0-6H184.9v-3.83h6.73Zm0-6.05H184.9v-3.84h6.73Zm0-6.05H184.9v-3.82h6.73Zm0-6.05H184.9v-3.82h6.73Zm0-6H184.9v-3.81h6.73Zm0-6.21H184.9v-3.82h6.73Zm10,78.8h-6.73v-3.83h6.73Zm0-6.06h-6.73v-3.82h6.73Zm0-6h-6.73v-3.82h6.73Zm0-6h-6.73v-3.83h6.73Zm0-6.05h-6.73v-3.83h6.73Zm0-6.06h-6.73v-3.83h6.73Zm0-6.05h-6.73v-3.82h6.73Zm0-6.05h-6.73v-3.82h6.73Zm0-6h-6.73v-3.83h6.73Zm0-6.05h-6.73v-3.84h6.73Zm0-6.05h-6.73v-3.82h6.73Zm0-6.05h-6.73v-3.82h6.73Zm0-6h-6.73v-3.81h6.73Zm0-6.21h-6.73v-3.82h6.73Zm10,78.8H204.9v-3.83h6.74Zm0-6.06H204.9v-3.82h6.74Zm0-6H204.9v-3.82h6.74Zm0-6H204.9v-3.83h6.74Zm0-6.05H204.9v-3.83h6.74Zm0-6.06H204.9v-3.83h6.74Zm0-6.05H204.9v-3.82h6.74Zm0-6.05H204.9v-3.82h6.74Zm0-6H204.9v-3.83h6.74Zm0-6.05H204.9v-3.84h6.74Zm0-6.05H204.9v-3.82h6.74Zm0-6.05H204.9v-3.82h6.74Zm0-6H204.9v-3.81h6.74Zm0-6.21H204.9v-3.82h6.74ZM229,312.22h-6.94v-2.06H229Zm0-5.72h-6.94v-2.08H229Zm0-5.76h-6.94v-2.05H229Zm0-5.74h-6.94v-2.06H229Zm0-5.73h-6.94v-2.06H229Zm0-5.74h-6.94v-2.06H229Zm0-5.74h-6.94v-2.07H229Zm0-5.75h-6.94V270H229Zm0-5.74h-6.94v-2.07H229Zm0-5.74h-6.94V258.5H229Zm0-5.74h-6.94v-2.07H229Zm0-5.74h-6.94V247H229Zm0-5.74h-6.94v-2.07H229Zm0-5.75h-6.94v-2.05H229Zm0-6.08h-6.94v-2.07H229Zm10.73,80.71h-6.95v-2.06h6.95Zm0-5.72h-6.95v-2.08h6.95Zm0-5.76h-6.95v-2.05h6.95Zm0-5.74h-6.95v-2.06h6.95Zm0-5.73h-6.95v-2.06h6.95Zm0-5.74h-6.95v-2.06h6.95Zm0-5.74h-6.95v-2.07h6.95Zm0-5.75h-6.95V270h6.95Zm0-5.74h-6.95v-2.07h6.95Zm0-5.74h-6.95V258.5h6.95Zm0-5.74h-6.95v-2.07h6.95Zm0-5.74h-6.95V247h6.95Zm0-5.74h-6.95v-2.07h6.95Zm0-5.75h-6.95v-2.05h6.95Zm0-6.08h-6.95v-2.07h6.95Zm10.71,80.71H243.5v-2.06h6.94Zm0-5.72H243.5v-2.08h6.94Zm0-5.76H243.5v-2.05h6.94Zm0-5.74H243.5v-2.06h6.94Zm0-5.73H243.5v-2.06h6.94Zm0-5.74H243.5v-2.06h6.94Zm0-5.74H243.5v-2.07h6.94Zm0-5.75H243.5V270h6.94Zm0-5.74H243.5v-2.07h6.94Zm0-5.74H243.5V258.5h6.94Zm0-5.74H243.5v-2.07h6.94Zm0-5.74H243.5V247h6.94Zm0-5.74H243.5v-2.07h6.94Zm0-5.75H243.5v-2.05h6.94Zm0-6.08H243.5v-2.07h6.94Zm10.74,80.71h-7v-2.06h7Zm0-5.72h-7v-2.08h7Zm0-5.76h-7v-2.05h7Zm0-5.74h-7v-2.06h7Zm0-5.73h-7v-2.06h7Zm0-5.74h-7v-2.06h7Zm0-5.74h-7v-2.07h7Zm0-5.75h-7V270h7Zm0-5.74h-7v-2.07h7Zm0-5.74h-7V258.5h7Zm0-5.74h-7v-2.07h7Zm0-5.74h-7V247h7Zm0-5.74h-7v-2.07h7Zm0-5.75h-7v-2.05h7Zm0-6.08h-7v-2.07h7Zm.91-7.08H230.75v-2.14h31.34Zm9.82,87.79h-7v-2.06h7Zm0-5.72h-7v-2.08h7Zm0-5.76h-7v-2.05h7Zm0-5.74h-7v-2.06h7Zm0-5.73h-7v-2.06h7Zm0-5.74h-7v-2.06h7Zm0-5.74h-7v-2.07h7Zm0-5.75h-7V270h7Zm0-5.74h-7v-2.07h7Zm0-5.74h-7V258.5h7Zm0-5.74h-7v-2.07h7Zm0-5.74h-7V247h7Zm0-5.74h-7v-2.07h7Zm0-5.75h-7v-2.05h7Zm0-6.08h-7v-2.07h7ZM293.81,212a10.85,10.85,0,0,1-15,0v-3a11,11,0,0,0,15,0Zm0-7.33a10.9,10.9,0,0,1-15,0v-3a11,11,0,0,0,15,0Zm0-7.34a10.87,10.87,0,0,1-15,0v-3a11,11,0,0,0,15,0Zm0-7.33a10.85,10.85,0,0,1-15,0v-3a11,11,0,0,0,15,0Zm0-7.34a10.85,10.85,0,0,1-15,0v-3a11,11,0,0,0,15,0Zm0-7.34a10.87,10.87,0,0,1-15,0v-3a11,11,0,0,0,15,0Zm0-7.33a10.87,10.87,0,0,1-15,0v-3a10.93,10.93,0,0,0,15,0Zm0-7.34a10.87,10.87,0,0,1-15,0v-3a10.93,10.93,0,0,0,15,0Zm29.63,145.32h-7.52v-7.66h7.52Zm0-10.71h-7.52v-7.64h7.52Zm0-10.68h-7.52v-7.66h7.52Zm0-10.71h-7.52v-7.65h7.52Zm0-10.7h-7.52v-7.65h7.52Zm0-10.7h-7.52v-7.65h7.52Zm0-10.7h-7.52V234.1h7.52Zm0-10.7h-7.52v-7.65h7.52Zm0-10.71h-7.52v-7.64h7.52Zm0-10.68h-7.52V202h7.52Zm0-10.7h-7.52v-7.66h7.52Zm0-10.71h-7.52v-7.65h7.52Zm0-10.69h-7.52V169.9h7.52Zm13.09,128.39H329v-7.66h7.53Zm0-10.71H329v-7.64h7.53Zm0-10.68H329v-7.66h7.53Zm0-10.71H329v-7.65h7.53Zm0-10.7H329v-7.65h7.53Zm0-10.7H329v-7.65h7.53Zm0-10.7H329V234.1h7.53Zm0-10.7H329v-7.65h7.53Zm0-10.71H329v-7.64h7.53Zm0-10.68H329V202h7.53Zm0-10.7H329v-7.66h7.53Zm0-10.71H329v-7.65h7.53Zm0-10.69H329V169.9h7.53Z"
                                    transform="translate(-121.89 -127.6)" />
                            </svg>
                        </div>
                        <label for="Corporate" class="radio-tile-label">Corporate</label>
                    </div>
                </div>
                <!--radio-input-->
            </div>
            <!--radio-tile-group-->
            <div class="text-field">
                <span>Name your deployment:</span>
                <input id="deploymentName" type="text" required minlength="1" maxlength="50" pattern="[a-zA-Z- +.,()0-9#!*@&?/']+"/>
            </div>
            <div class="text-field">
                <span>Name the integrator working on this project:</span>
                <input id="integratorName" type="text" required minlength="1" maxlength="50" pattern="[a-zA-Z- +.,()0-9#!*@&?\']+"/>
            </div>
            <button id="newDeploymentBtn" class="primary-btn" type="submit" disabled>Create Deployment</button>
        </form>
    `

    addNewDeploymentEvents();
}