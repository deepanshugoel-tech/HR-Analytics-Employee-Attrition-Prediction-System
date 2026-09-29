/* =========================================================
   AI-POWERED HR ANALYTICS & EMPLOYEE ATTRITION
   COMPLETE FRONTEND JAVASCRIPT
   VERSION: 2.0
========================================================= */


/* =========================================================
   API CONFIGURATION
========================================================= */

const API_BASE_URL = "http://127.0.0.1:8000";

const PREDICT_API =
    `${API_BASE_URL}/predict`;

const SHAP_API =
    `${API_BASE_URL}/explain`;


/* =========================================================
   CURRENT DATE
========================================================= */

const currentDateElement =
    document.getElementById("currentDate");

if (currentDateElement) {

    const today = new Date();

    currentDateElement.textContent =
        today.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}


/* =========================================================
   CHART.JS GLOBAL SETTINGS
========================================================= */

if (typeof Chart !== "undefined") {

    Chart.defaults.font.family =
        "Arial, Helvetica, sans-serif";

    if (
        Chart.defaults.plugins &&
        Chart.defaults.plugins.legend &&
        Chart.defaults.plugins.legend.labels
    ) {

        Chart.defaults.plugins.legend.labels.usePointStyle =
            true;

    }
}


/* =========================================================
   DASHBOARD CHART REFERENCES
========================================================= */

let departmentChart = null;
let attritionChart = null;


/* =========================================================
   DEPARTMENT-WISE ATTRITION
========================================================= */

const departmentChartElement =
    document.getElementById("departmentChart");

if (
    departmentChartElement &&
    typeof Chart !== "undefined"
) {

    departmentChart = new Chart(
        departmentChartElement,
        {
            type: "bar",

            data: {

                labels: [
                    "Research & Development",
                    "Sales",
                    "Human Resources"
                ],

                datasets: [
                    {
                        label: "Employees Left",

                        data: [
                            133,
                            92,
                            12
                        ],

                        backgroundColor: [
                            "#2563eb",
                            "#7c3aed",
                            "#ef4444"
                        ],

                        borderRadius: 6
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {
                        beginAtZero: true
                    }

                }

            }
        }
    );
}


/* =========================================================
   ATTRITION OVERVIEW
========================================================= */

const attritionChartElement =
    document.getElementById("attritionChart");

if (
    attritionChartElement &&
    typeof Chart !== "undefined"
) {

    attritionChart = new Chart(
        attritionChartElement,
        {
            type: "doughnut",

            data: {

                labels: [
                    "Stayed",
                    "Left"
                ],

                datasets: [
                    {
                        data: [
                            1233,
                            237
                        ],

                        backgroundColor: [
                            "#16a34a",
                            "#dc2626"
                        ],

                        borderWidth: 0
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "65%",

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                }

            }
        }
    );
}


/* =========================================================
   JOB ROLE ATTRITION
========================================================= */

const jobRoleChartElement =
    document.getElementById("jobRoleChart");

if (
    jobRoleChartElement &&
    typeof Chart !== "undefined"
) {

    new Chart(
        jobRoleChartElement,
        {
            type: "bar",

            data: {

                labels: [
                    "Sales Executive",
                    "Research Scientist",
                    "Lab Technician",
                    "Manufacturing Director",
                    "Healthcare Representative",
                    "Manager",
                    "Sales Representative"
                ],

                datasets: [
                    {
                        label: "Employees Left",

                        data: [
                            57,
                            47,
                            62,
                            10,
                            9,
                            5,
                            33
                        ],

                        backgroundColor: "#6366f1",

                        borderRadius: 5
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {
                        beginAtZero: true
                    }

                }

            }
        }
    );
}


/* =========================================================
   GENDER-WISE ATTRITION
========================================================= */

const genderChartElement =
    document.getElementById("genderChart");

if (
    genderChartElement &&
    typeof Chart !== "undefined"
) {

    new Chart(
        genderChartElement,
        {
            type: "bar",

            data: {

                labels: [
                    "Male",
                    "Female"
                ],

                datasets: [
                    {
                        label: "Employees Left",

                        data: [
                            150,
                            87
                        ],

                        backgroundColor: [
                            "#3b82f6",
                            "#ec4899"
                        ],

                        borderRadius: 6
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {
                        beginAtZero: true
                    }

                }

            }
        }
    );
}


/* =========================================================
   AGE DISTRIBUTION
========================================================= */

const ageChartElement =
    document.getElementById("ageChart");

if (
    ageChartElement &&
    typeof Chart !== "undefined"
) {

    new Chart(
        ageChartElement,
        {
            type: "line",

            data: {

                labels: [
                    "18-25",
                    "26-30",
                    "31-35",
                    "36-40",
                    "41-45",
                    "46-50",
                    "51+"
                ],

                datasets: [
                    {
                        label: "Employees",

                        data: [
                            120,
                            280,
                            350,
                            300,
                            210,
                            140,
                            70
                        ],

                        borderColor: "#2563eb",

                        backgroundColor:
                            "rgba(37, 99, 235, 0.10)",

                        fill: true,

                        tension: 0.4,

                        pointRadius: 4
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {
                        beginAtZero: true
                    }

                }

            }
        }
    );
}


/* =========================================================
   JOB SATISFACTION
========================================================= */

const satisfactionChartElement =
    document.getElementById("satisfactionChart");

if (
    satisfactionChartElement &&
    typeof Chart !== "undefined"
) {

    new Chart(
        satisfactionChartElement,
        {
            type: "bar",

            data: {

                labels: [
                    "Low",
                    "Medium",
                    "High",
                    "Very High"
                ],

                datasets: [
                    {
                        label: "Employees",

                        data: [
                            280,
                            300,
                            460,
                            430
                        ],

                        backgroundColor: "#14b8a6",

                        borderRadius: 6
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {
                        beginAtZero: true
                    }

                }

            }
        }
    );
}


/* =========================================================
   FEATURE IMPORTANCE
========================================================= */

const featureImportanceChartElement =
    document.getElementById(
        "featureImportanceChart"
    );

if (
    featureImportanceChartElement &&
    typeof Chart !== "undefined"
) {

    new Chart(
        featureImportanceChartElement,
        {
            type: "bar",

            data: {

                labels: [
                    "MonthlyIncome",
                    "OverTime_Yes",
                    "DailyRate",
                    "EmployeeNumber",
                    "Age",
                    "TotalWorkingYears",
                    "MonthlyRate",
                    "HourlyRate",
                    "DistanceFromHome",
                    "YearsAtCompany"
                ],

                datasets: [
                    {
                        label: "Feature Importance",

                        data: [
                            0.071784,
                            0.061896,
                            0.054603,
                            0.049249,
                            0.048570,
                            0.047738,
                            0.047392,
                            0.041425,
                            0.040048,
                            0.036038
                        ],

                        backgroundColor: "#8b5cf6",

                        borderRadius: 5
                    }
                ]
            },

            options: {

                indexAxis: "y",

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        callbacks: {

                            label: function(context) {

                                const value =
                                    Number(context.raw) * 100;

                                return (
                                    " Importance: " +
                                    value.toFixed(2) +
                                    "%"
                                );

                            }

                        }

                    }

                },

                scales: {

                    x: {

                        beginAtZero: true,

                        ticks: {

                            callback: function(value) {

                                return (
                                    Number(value) * 100 +
                                    "%"
                                );

                            }

                        }

                    }

                }

            }

        }
    );
}


/* =========================================================
   PREDICTION HISTORY
========================================================= */

let predictionHistory = [];

try {

    predictionHistory =
        JSON.parse(
            localStorage.getItem(
                "hrPredictionHistory"
            )
        ) || [];

    if (!Array.isArray(predictionHistory)) {
        predictionHistory = [];
    }

}
catch (error) {

    console.warn(
        "Prediction history could not be loaded.",
        error
    );

    predictionHistory = [];

}


/* =========================================================
   SAVE PREDICTION HISTORY
========================================================= */
function savePredictionHistory(data) {

    predictionHistory.unshift(data);

    predictionHistory =
        predictionHistory.slice(0, 20);

    try {

        localStorage.setItem(
            "hrPredictionHistory",
            JSON.stringify(predictionHistory)
        );

    }
    catch (error) {

        console.error(
            "Unable to save prediction history:",
            error
        );

    }

    renderPredictionHistory();

    // Update High-Risk Employees table
    updateHighRiskEmployees();
}


/* =========================================================
   RENDER PREDICTION HISTORY
========================================================= */

function renderPredictionHistory() {

    const historyBody =
        document.getElementById(
            "predictionHistoryBody"
        );

    if (!historyBody) {
        return;
    }


    if (
        predictionHistory.length === 0
    ) {

        historyBody.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="no-history"
                >
                    No predictions yet.
                </td>

            </tr>

        `;

        return;
    }


    historyBody.innerHTML =
        predictionHistory
            .map(function(item) {

                const prediction =
                    String(
                        item.prediction || ""
                    );

                const riskLevel =
                    String(
                        item.riskLevel || "Unknown"
                    );


                const predictionClass =
                    prediction === "Yes"
                        ? "history-danger"
                        : "history-success";


                const riskLower =
                    riskLevel.toLowerCase();


                const riskClass =
                    riskLower.includes("high")
                        ? "history-danger"

                        : riskLower.includes("medium")
                            ? "history-warning"

                            : "history-success";


                const income =
                    Number(
                        item.income || 0
                    );


                return `

                    <tr>

                        <td>
                            ${item.time || "-"}
                        </td>

                        <td>
                            ${item.age ?? "-"}
                        </td>

                        <td>
                            ₹${income.toLocaleString(
                                "en-IN"
                            )}
                        </td>

                        <td>
                            ${item.overtime || "-"}
                        </td>

                        <td>
                            ${item.yearsCompany ?? "-"}
                        </td>

                        <td
                            class="${predictionClass}"
                        >

                            ${
                                prediction === "Yes"
                                    ? "Likely to Leave"
                                    : "Likely to Stay"
                            }

                        </td>

                        <td>
                            ${item.riskPercentage ?? 0}%
                        </td>

                        <td
                            class="${riskClass}"
                        >
                            ${riskLevel}
                        </td>

                    </tr>

                `;

            })
            .join("");
}


/* =========================================================
   ADD PREDICTION TO HISTORY
========================================================= */

function addCurrentPredictionToHistory(
    age,
    income,
    yearsCompany,
    overtime,
    prediction,
    riskPercentage,
    riskLevel
) {

    const now =
        new Date();


    const time =
        now.toLocaleString(
            "en-IN",
            {
                dateStyle: "short",
                timeStyle: "short"
            }
        );


    savePredictionHistory({

        time: time,

        age: age,

        income: income,

        overtime: overtime,

        yearsCompany:
            yearsCompany,

        prediction:
            prediction,

        riskPercentage:
            riskPercentage,

        riskLevel:
            riskLevel

    });
}


/* =========================================================
   CLEAR HISTORY
   FIXED — ONLY ONE EVENT LISTENER
========================================================= */

const clearHistoryBtn =
    document.getElementById(
        "clearHistoryBtn"
    );

if (clearHistoryBtn) {

    clearHistoryBtn.addEventListener(
        "click",
        function() {

            const confirmClear =
                confirm(
                    "Are you sure you want to clear prediction history?"
                );


            if (!confirmClear) {
                return;
            }


            predictionHistory = [];


            localStorage.removeItem(
                "hrPredictionHistory"
            );


            renderPredictionHistory();
            updateHighRiskEmployees();


            console.log(
                "Prediction history cleared."
            );

        }
    );

}


/* =========================================================
   INITIAL HISTORY LOAD
========================================================= */

renderPredictionHistory();


/* =========================================================
   PREDICTION FORM
========================================================= */

const predictionForm =
    document.getElementById(
        "predictionForm"
    );


if (predictionForm) {

    predictionForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            /* =================================================
               GET FORM VALUES
            ================================================= */

            const ageInput =
                document.getElementById(
                    "age"
                );


            const incomeInput =
                document.getElementById(
                    "income"
                );


            const yearsCompanyInput =
                document.getElementById(
                    "yearsCompany"
                );


            const satisfactionInput =
                document.getElementById(
                    "satisfaction"
                );


            const overtimeInput =
                document.getElementById(
                    "overtime"
                );


            const jobLevelInput =
                document.getElementById(
                    "jobLevel"
                );


            if (
                !ageInput ||
                !incomeInput ||
                !yearsCompanyInput ||
                !satisfactionInput ||
                !overtimeInput ||
                !jobLevelInput
            ) {

                console.error(
                    "Prediction form fields are missing."
                );

                return;
            }


            const age =
                Number(
                    ageInput.value
                );


            const income =
                Number(
                    incomeInput.value
                );


            const yearsCompany =
                Number(
                    yearsCompanyInput.value
                );


            const satisfaction =
                Number(
                    satisfactionInput.value
                );


            const overtime =
                overtimeInput.value;


            const jobLevel =
                Number(
                    jobLevelInput.value
                );


            /* =================================================
               RESULT ELEMENTS
            ================================================= */

            const predictionMessage =
                document.getElementById(
                    "predictionMessage"
                );


            const riskScore =
                document.getElementById(
                    "riskScore"
                );


            const riskLabel =
                document.getElementById(
                    "riskLabel"
                );


            const riskProgress =
                document.getElementById(
                    "riskProgress"
                );


            const explanationText =
                document.getElementById(
                    "explanationText"
                );


            /* =================================================
               RESET RESULT
            ================================================= */

            if (predictionMessage) {

                predictionMessage.textContent =
                    "Analyzing employee data using Machine Learning...";

            }


            if (riskScore) {

                riskScore.textContent =
                    "--%";

            }


            if (riskLabel) {

                riskLabel.textContent =
                    "Analyzing...";

                riskLabel.style.color =
                    "#2563eb";

            }


            if (riskProgress) {

                riskProgress.style.width =
                    "0%";

                riskProgress.style.background =
                    "#2563eb";

            }


            if (explanationText) {

                explanationText.textContent =
                    "Generating employee attrition prediction...";

            }


            /* =================================================
               DISABLE BUTTON WHILE PROCESSING
            ================================================= */

            const predictButton =
                predictionForm.querySelector(
                    'button[type="submit"]'
                );


            if (predictButton) {

                predictButton.disabled =
                    true;

                predictButton.textContent =
                    "⏳ Analyzing...";

            }


            /* =================================================
               ML PREDICTION
            ================================================= */

            try {

                console.log(
                    "Sending prediction request:",
                    {
                        Age: age,
                        MonthlyIncome: income,
                        YearsAtCompany: yearsCompany,
                        JobSatisfaction: satisfaction,
                        OverTime: overtime,
                        JobLevel: jobLevel
                    }
                );


                const response =
                    await fetch(
                        PREDICT_API,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                Age:
                                    age,

                                MonthlyIncome:
                                    income,

                                YearsAtCompany:
                                    yearsCompany,

                                JobSatisfaction:
                                    satisfaction,

                                OverTime:
                                    overtime,

                                JobLevel:
                                    jobLevel

                            })

                        }
                    );


                /* =================================================
                   API ERROR
                ================================================= */

                if (!response.ok) {

                    let errorMessage =
                        "Prediction request failed.";

                    try {

                        const errorData =
                            await response.json();

                        errorMessage =
                            errorData.detail ||
                            errorMessage;

                    }
                    catch (jsonError) {

                        console.warn(
                            "Could not parse prediction error."
                        );

                    }


                    throw new Error(
                        errorMessage
                    );

                }


                /* =================================================
                   READ ML RESULT
                ================================================= */

                const result =
                    await response.json();


                console.log(
                    "ML Prediction Result:",
                    result
                );


                const riskPercentage =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            Number(
                                result.risk_percentage || 0
                            )
                        )
                    );


                const riskLevel =
                    result.risk_level ||
                    "Unknown";


                const prediction =
                    result.prediction ||
                    "Unknown";


                /* =================================================
                   SAVE HISTORY
                ================================================= */

                addCurrentPredictionToHistory(
                    age,
                    income,
                    yearsCompany,
                    overtime,
                    prediction,
                    riskPercentage,
                    riskLevel
                );


                /* =================================================
                   RISK SCORE
                ================================================= */

                if (riskScore) {

                    riskScore.textContent =
                        riskPercentage +
                        "%";

                }


                /* =================================================
                   RISK LEVEL
                ================================================= */

                if (riskLabel) {

                    riskLabel.textContent =
                        riskLevel;


                    const level =
                        String(
                            riskLevel
                        ).toLowerCase();


                    if (
                        level.includes("low")
                    ) {

                        riskLabel.style.color =
                            "#16a34a";

                    }

                    else if (
                        level.includes("medium")
                    ) {

                        riskLabel.style.color =
                            "#d97706";

                    }

                    else if (
                        level.includes("high")
                    ) {

                        riskLabel.style.color =
                            "#dc2626";

                    }

                }


                /* =================================================
                   RISK PROGRESS
                ================================================= */

                if (riskProgress) {

                    riskProgress.style.width =
                        riskPercentage +
                        "%";


                    const level =
                        String(
                            riskLevel
                        ).toLowerCase();


                    if (
                        level.includes("low")
                    ) {

                        riskProgress.style.background =
                            "#16a34a";

                    }

                    else if (
                        level.includes("medium")
                    ) {

                        riskProgress.style.background =
                            "#d97706";

                    }

                    else if (
                        level.includes("high")
                    ) {

                        riskProgress.style.background =
                            "#dc2626";

                    }

                }


                /* =================================================
                   PREDICTION MESSAGE
                ================================================= */

                if (predictionMessage) {

                    const predictionText =
                        String(
                            prediction
                        ).toLowerCase();


                    if (
                        predictionText === "yes" ||
                        predictionText.includes("leave")
                    ) {

                        predictionMessage.textContent =
                            "⚠️ Employee is predicted to leave the company.";

                    }

                    else {

                        predictionMessage.textContent =
                            "✅ Employee is predicted to stay with the company.";

                    }

                }


                /* =================================================
                   EMPLOYEE FACTORS
                ================================================= */

                const explanationOvertime =
                    document.getElementById(
                        "explanationOvertime"
                    );


                const explanationIncome =
                    document.getElementById(
                        "explanationIncome"
                    );


                const explanationYears =
                    document.getElementById(
                        "explanationYears"
                    );


                const explanationSatisfaction =
                    document.getElementById(
                        "explanationSatisfaction"
                    );


                if (explanationOvertime) {

                    explanationOvertime.textContent =
                        overtime === "Yes"
                            ? "Yes"
                            : "No";

                }


                if (explanationIncome) {

                    explanationIncome.textContent =
                        "₹" +
                        income.toLocaleString(
                            "en-IN"
                        );

                }


                if (explanationYears) {

                    explanationYears.textContent =
                        yearsCompany +
                        (
                            yearsCompany === 1
                                ? " year"
                                : " years"
                        );

                }


                if (explanationSatisfaction) {

                    explanationSatisfaction.textContent =
                        satisfaction +
                        " / 4";

                }


                /* =================================================
                   SHAP EXPLAINABLE AI
                ================================================= */

                try {

                    if (explanationText) {

                        explanationText.textContent =
                            "Generating SHAP-based Explainable AI analysis...";

                    }


                    console.log(
                        "Sending SHAP explanation request..."
                    );


                    const shapResponse =
                        await fetch(
                            SHAP_API,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    Age:
                                        age,

                                    MonthlyIncome:
                                        income,

                                    YearsAtCompany:
                                        yearsCompany,

                                    JobSatisfaction:
                                        satisfaction,

                                    OverTime:
                                        overtime,

                                    JobLevel:
                                        jobLevel

                                })

                            }
                        );


                    /* =================================================
                       SHAP API ERROR
                    ================================================= */

                    if (!shapResponse.ok) {

                        let shapError =
                            "SHAP explanation request failed.";

                        try {

                            const errorData =
                                await shapResponse.json();

                            shapError =
                                errorData.detail ||
                                shapError;

                        }
                        catch (jsonError) {

                            console.warn(
                                "Could not parse SHAP error."
                            );

                        }


                        throw new Error(
                            shapError
                        );

                    }


                    /* =================================================
                       READ SHAP RESULT
                    ================================================= */

                    const shapResult =
                        await shapResponse.json();


                    console.log(
                        "SHAP Explanation Result:",
                        shapResult
                    );


                    const topFactors =
                        Array.isArray(
                            shapResult.top_factors
                        )
                            ? shapResult.top_factors
                            : [];


                    console.log(
                        "========== TOP SHAP FACTORS =========="
                    );


                    topFactors.forEach(
                        function(
                            factor,
                            index
                        ) {

                            console.log(

                                `${index + 1}. ` +
                                `${factor.feature} | ` +
                                `${factor.impact} | ` +
                                `SHAP Value: ` +
                                `${factor.shap_value}`

                            );

                        }
                    );


                    /* =================================================
                       REMOVE TECHNICAL IDENTIFIERS
                    ================================================= */

                    const businessFactors =
                        topFactors.filter(
                            function(factor) {

                                const feature =
                                    String(
                                        factor.feature ||
                                        ""
                                    ).toLowerCase();


                                return (
                                    feature !==
                                    "employeenumber" &&

                                    feature !==
                                    "employee number" &&

                                    feature !==
                                    "id"
                                );

                            }
                        );


                    /* =================================================
                       TOP 5 BUSINESS FACTORS
                    ================================================= */

                    const topFive =
                        businessFactors.slice(
                            0,
                            5
                        );


                    /* =================================================
                       SHAP CONTAINER
                    ================================================= */

                    const shapFactorsContainer =
                        document.getElementById(
                            "shapFactorsContainer"
                        );


                    if (
                        shapFactorsContainer
                    ) {

                        shapFactorsContainer.innerHTML =
                            "";


                        if (
                            topFive.length === 0
                        ) {

                            shapFactorsContainer.innerHTML = `

                                <div class="shap-empty">

                                    No business-relevant SHAP factors
                                    were returned.

                                </div>

                            `;

                        }


                        /* =================================================
                           CREATE SHAP CARDS
                        ================================================= */

                        topFive.forEach(
                            function(
                                factor,
                                index
                            ) {

                                const card =
                                    document.createElement(
                                        "div"
                                    );


                                card.className =
                                    "shap-factor-card";


                                /* -----------------------------------------
                                   FEATURE NAME
                                ----------------------------------------- */

                                const featureName =
                                    String(
                                        factor.feature ||
                                        "Unknown Feature"
                                    );


                                /* -----------------------------------------
                                   SHAP VALUE
                                ----------------------------------------- */

                                const shapValue =
                                    Number(
                                        factor.shap_value || 0
                                    );


                                /* -----------------------------------------
                                   IMPACT
                                ----------------------------------------- */

                                const impact =
                                    String(
                                        factor.impact ||
                                        "Neutral impact"
                                    );


                                const impactLower =
                                    impact.toLowerCase();


                                let impactClass =
                                    "shap-neutral";


                                let impactIcon =
                                    "•";


                                if (
                                    impactLower.includes(
                                        "increases"
                                    )
                                ) {

                                    impactClass =
                                        "shap-positive";

                                    impactIcon =
                                        "↑";

                                }

                                else if (
                                    impactLower.includes(
                                        "reduces"
                                    )
                                ) {

                                    impactClass =
                                        "shap-negative";

                                    impactIcon =
                                        "↓";

                                }


                                /* -----------------------------------------
                                   CARD HTML
                                ----------------------------------------- */

                                card.innerHTML = `

                                    <div
                                        class="shap-factor-left"
                                    >

                                        <div
                                            class="shap-factor-number"
                                        >
                                            ${index + 1}
                                        </div>

                                        <div
                                            class="shap-factor-name"
                                        >
                                            ${featureName}
                                        </div>

                                    </div>


                                    <div
                                        class="shap-factor-right"
                                    >

                                        <span
                                            class="shap-impact ${impactClass}"
                                        >

                                            ${impactIcon}
                                            ${impact}

                                        </span>


                                        <span
                                            class="shap-value"
                                        >

                                            SHAP:
                                            ${
                                                shapValue >= 0
                                                    ? "+"
                                                    : ""
                                            }${shapValue.toFixed(4)}

                                        </span>

                                    </div>

                                `;


                                shapFactorsContainer
                                    .appendChild(
                                        card
                                    );

                            }
                        );

                    }


                    /* =================================================
                       SHAP EXPLANATION TEXT
                    ================================================= */

                    if (explanationText) {

                        if (
                            topFive.length > 0
                        ) {

                            explanationText.textContent =
                                "SHAP Explainable AI analyzed this employee and identified the business-relevant factors below as the strongest influences on the prediction.";

                        }

                        else {

                            explanationText.textContent =
                                "The prediction was completed, but no business-relevant SHAP factors were returned.";

                        }

                    }


                    /* =================================================
                       SAVE LATEST SHAP RESULT
                    ================================================= */

                    window.latestSHAPExplanation =
                        shapResult;


                    console.log(
                        "Complete SHAP Result:",
                        shapResult
                    );

                }


                /* =================================================
                   SHAP ERROR HANDLING
                ================================================= */

                catch (shapError) {

                    console.error(
                        "SHAP Explanation Error:",
                        shapError
                    );


                    if (explanationText) {

                        explanationText.textContent =
                            "The employee prediction was completed, but SHAP explainability could not be loaded. Please make sure the /explain API is running.";

                    }


                    const shapFactorsContainer =
                        document.getElementById(
                            "shapFactorsContainer"
                        );


                    if (
                        shapFactorsContainer
                    ) {

                        shapFactorsContainer.innerHTML = `

                            <div class="shap-empty">

                                SHAP explanation is currently
                                unavailable.

                            </div>

                        `;

                    }

                }

            }


            /* =================================================
               MAIN PREDICTION ERROR
            ================================================= */

            catch (error) {

                console.error(
                    "Prediction API Error:",
                    error
                );


                if (predictionMessage) {

                    predictionMessage.textContent =
                        "❌ Unable to connect with the Machine Learning API. Please make sure FastAPI backend is running.";

                }


                if (riskScore) {

                    riskScore.textContent =
                        "--%";

                }


                if (riskLabel) {

                    riskLabel.textContent =
                        "API Error";

                    riskLabel.style.color =
                        "#dc2626";

                }


                if (riskProgress) {

                    riskProgress.style.width =
                        "0%";

                    riskProgress.style.background =
                        "#dc2626";

                }


                if (explanationText) {

                    explanationText.textContent =
                        "Prediction could not be completed because the FastAPI backend is not responding.";

                }

            }


            /* =================================================
               ENABLE BUTTON
            ================================================= */

            finally {

                if (predictButton) {

                    predictButton.disabled =
                        false;

                    predictButton.textContent =
                        "🤖 Predict Attrition Risk";

                }

            }

        }
    );

}


/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const pageSections =
    document.querySelectorAll(
        ".page-section"
    );


/* =========================================================
   NAV LINK CLICK
========================================================= */

navLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    targetId &&
                    targetId.startsWith("#")
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }

                }

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    function() {

        let currentSection =
            "";


        pageSections.forEach(
            function(section) {

                const sectionTop =
                    section.offsetTop;


                if (
                    window.scrollY >=
                    sectionTop - 180
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            function(link) {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    "#" +
                    currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   SYSTEM STATUS
========================================================= */

console.log(
    "=========================================="
);

console.log(
    "HR Analytics System Loaded Successfully."
);

console.log(
    "Real ML Prediction API:",
    PREDICT_API
);

console.log(
    "SHAP Explainable AI API:",
    SHAP_API
);

console.log(
    "Backend Documentation:",
    `${API_BASE_URL}/docs`
);

console.log(
    "Prediction History: LocalStorage enabled."
);

console.log(
    "EmployeeNumber filtering: ENABLED"
);

console.log(
    "Business-relevant SHAP display: ENABLED"
);

console.log(
    "=========================================="
);
// =========================================================
// REAL DASHBOARD DATA FROM BACKEND
// =========================================================

async function loadDashboardData() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/dashboard-summary`
        );

        if (!response.ok) {
            throw new Error(
                "Dashboard API request failed."
            );
        }

        const data = await response.json();

        console.log(
            "Dashboard data loaded:",
            data
        );


        // =================================================
        // UPDATE KPI CARDS
        // =================================================

        const totalEmployees =
            document.getElementById(
                "totalEmployees"
            );

        const employeesLeft =
            document.getElementById(
                "employeesLeft"
            );

        const attritionRate =
            document.getElementById(
                "attritionRate"
            );

        const avgIncome =
            document.getElementById(
                "avgIncome"
            );


        if (totalEmployees) {

            totalEmployees.textContent =
                Number(
                    data.total_employees
                ).toLocaleString("en-IN");

        }


        if (employeesLeft) {

            employeesLeft.textContent =
                Number(
                    data.employees_left
                ).toLocaleString("en-IN");

        }


        if (attritionRate) {

            attritionRate.textContent =
                `${data.attrition_rate}%`;

        }


        if (avgIncome) {
    avgIncome.textContent =
        `₹${Number(
            data.average_monthly_income
        ).toLocaleString("en-IN", {
            maximumFractionDigits: 0
        })}`;
}


        // =================================================
        // DEPARTMENT CHART
        // =================================================

        if (
            typeof departmentChart !== "undefined" &&
            departmentChart
        ) {

            departmentChart.data.labels =
                Object.keys(
                    data.department_attrition
                );

            departmentChart.data.datasets[0].data =
                Object.values(
                    data.department_attrition
                );

            departmentChart.update();

        }


        // =================================================
        // ATTRITION CHART
        // =================================================

        if (
            typeof attritionChart !== "undefined" &&
            attritionChart
        ) {

            attritionChart.data.labels =
                Object.keys(
                    data.attrition_distribution
                );

            attritionChart.data.datasets[0].data =
                Object.values(
                    data.attrition_distribution
                );

            attritionChart.update();

        }


        console.log(
            "Dashboard updated successfully."
        );

    }
    catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );

    }

}

// ============================================================
// REAL HIGH-RISK EMPLOYEES FROM FASTAPI
// ============================================================

async function updateHighRiskEmployees() {

    const tableBody =
        document.getElementById("highRiskEmployeesBody");

    const highRiskCount =
        document.getElementById("highRiskCount");

    if (!tableBody || !highRiskCount) {
        return;
    }

    try {

        // Show loading state
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Loading high-risk employees...
                </td>
            </tr>
        `;

        // Call FastAPI
        const response = await fetch(
            `${API_BASE_URL}/high-risk-employees`
        );

        if (!response.ok) {
            throw new Error(
                `High-risk API failed: HTTP ${response.status}`
            );
        }

        const data = await response.json();

        console.log(
            "High-risk employees from API:",
            data
        );

        // Get employees
        const employees =
            Array.isArray(data.employees)
                ? data.employees
                : [];


        // Update count
        highRiskCount.textContent =
            data.total_high_risk ?? employees.length;


        // No high-risk employees
        if (employees.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="6"
                        style="text-align:center;"
                    >
                        No high-risk employees identified.
                    </td>
                </tr>
            `;

            return;
        }


        // Create table rows
        tableBody.innerHTML =
            employees.map(function(employee) {

                const employeeNumber =
                    employee.employee_number ?? "-";

                const age =
                    employee.age ?? "-";

                const income =
                    Number(
                        employee.monthly_income || 0
                    ).toLocaleString("en-IN");

                const overtime =
                    employee.overtime ?? "-";

                const risk =
                    Number(
                        employee.risk_percentage || 0
                    );

                const riskLevel =
                    employee.risk_level || "High";


                return `
                    <tr>

                        <td>
                            <strong>
                                Employee ${employeeNumber}
                            </strong>
                        </td>

                        <td>
                            ${age}
                        </td>

                        <td>
                            ₹${income}
                        </td>

                        <td>
                            <span class="overtime-badge">
                                ${overtime}
                            </span>
                        </td>

                        <td>
                            <strong>
                                ${risk}%
                            </strong>
                        </td>

                        <td>
                            <span class="risk-badge high">
                                🔴 ${riskLevel}
                            </span>
                        </td>

                    </tr>
                `;

            }).join("");


    }
    catch (error) {

        console.error(
            "High-risk employees API error:",
            error
        );

        highRiskCount.textContent = "0";

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    style="text-align:center;"
                >
                    ❌ Unable to load high-risk employees.
                </td>
            </tr>
        `;
    }
}
// =========================================================
// LOAD DASHBOARD DATA
// =========================================================

loadDashboardData();
// ============================================================
// LOAD HIGH-RISK EMPLOYEES
// ============================================================

updateHighRiskEmployees();

// ============================================================
// EMPLOYEE SEARCH
// ============================================================

async function searchEmployees() {

    const tableBody =
        document.getElementById("employeeSearchBody");

    const employeeSearchCount =
        document.getElementById("employeeSearchCount");

    if (!tableBody || !employeeSearchCount) {
        return;
    }

    // ---------------------------------------------------------
    // GET FILTER VALUES
    // ---------------------------------------------------------

    const department =
        document.getElementById("searchDepartment")?.value || "All";

    const jobRole =
        document.getElementById("searchJobRole")?.value || "All";

    const gender =
        document.getElementById("searchGender")?.value || "All";

    const overtime =
        document.getElementById("searchOvertime")?.value || "All";

    const attrition =
        document.getElementById("searchAttrition")?.value || "All";


    // ---------------------------------------------------------
    // SHOW LOADING
    // ---------------------------------------------------------

    tableBody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center;">
                🔄 Searching employees...
            </td>
        </tr>
    `;

    employeeSearchCount.textContent = "...";


    try {

        // -----------------------------------------------------
        // BUILD API URL
        // -----------------------------------------------------

        const params = new URLSearchParams({

            department: department,
            job_role: jobRole,
            gender: gender,
            overtime: overtime,
            attrition: attrition

        });


        const response =
            await fetch(
                `${API_BASE_URL}/employees/search?${params.toString()}`
            );


        // -----------------------------------------------------
        // API ERROR
        // -----------------------------------------------------

        if (!response.ok) {

            throw new Error(
                `Employee Search API failed: HTTP ${response.status}`
            );

        }


        // -----------------------------------------------------
        // READ RESPONSE
        // -----------------------------------------------------

        const data =
            await response.json();


        console.log(
            "Employee Search Result:",
            data
        );


        // -----------------------------------------------------
        // GET EMPLOYEES
        // -----------------------------------------------------

        const employees =
            Array.isArray(data.employees)
                ? data.employees
                : [];


        // -----------------------------------------------------
        // UPDATE COUNT
        // -----------------------------------------------------

        employeeSearchCount.textContent =
            data.total ?? employees.length;


        // -----------------------------------------------------
        // NO RESULTS
        // -----------------------------------------------------

        if (employees.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="8"
                        style="text-align:center;"
                    >
                        ❌ No employees found for the selected filters.
                    </td>
                </tr>
            `;

            return;
        }


        // -----------------------------------------------------
        // CREATE TABLE ROWS
        // -----------------------------------------------------

        tableBody.innerHTML =
            employees.map(function(employee) {

                const employeeNumber =
                    employee.employee_number ?? "-";

                const age =
                    employee.age ?? "-";

                const departmentName =
                    employee.department ?? "-";

                const jobRoleName =
                    employee.job_role ?? "-";

                const employeeGender =
                    employee.gender ?? "-";

                const employeeOvertime =
                    employee.overtime ?? "-";

                const income =
                    Number(
                        employee.monthly_income || 0
                    ).toLocaleString("en-IN");

                const attritionStatus =
                    employee.attrition ?? "-";


                // -------------------------------------------------
                // ATTRITION BADGE
                // -------------------------------------------------

                const attritionBadge =
                    String(attritionStatus).toLowerCase() === "yes"

                        ? `
                            <span class="risk-badge high">
                                🔴 Left
                            </span>
                          `

                        : `
                            <span class="risk-badge low">
                                🟢 Active
                            </span>
                          `;


                // -------------------------------------------------
                // OVERTIME BADGE
                // -------------------------------------------------

                const overtimeBadge =
                    String(employeeOvertime).toLowerCase() === "yes"

                        ? `
                            <span class="overtime-badge">
                                Yes
                            </span>
                          `

                        : `
                            <span>
                                No
                            </span>
                          `;


                return `
                    <tr>

                        <td>
                            <strong>
                                Employee ${employeeNumber}
                            </strong>
                        </td>

                        <td>
                            ${age}
                        </td>

                        <td>
                            ${departmentName}
                        </td>

                        <td>
                            ${jobRoleName}
                        </td>

                        <td>
                            ${employeeGender}
                        </td>

                        <td>
                            ${overtimeBadge}
                        </td>

                        <td>
                            ₹${income}
                        </td>

                        <td>
                            ${attritionBadge}
                        </td>

                    </tr>
                `;

            }).join("");


    }
    catch (error) {

        console.error(
            "Employee Search Error:",
            error
        );


        employeeSearchCount.textContent =
            "0";


        tableBody.innerHTML = `
            <tr>

                <td
                    colspan="8"
                    style="text-align:center;"
                >

                    ❌ Unable to load employee records.

                    <br>

                    <small>
                        Make sure FastAPI backend is running.
                    </small>

                </td>

            </tr>
        `;

    }

}



// ============================================================
// EMPLOYEE SEARCH BUTTON
// ============================================================

const searchEmployeesBtn =
    document.getElementById(
        "searchEmployeesBtn"
    );


if (searchEmployeesBtn) {

    searchEmployeesBtn.addEventListener(
        "click",
        function() {

            searchEmployees();

        }
    );

}



// ============================================================
// RESET EMPLOYEE SEARCH
// ============================================================

const resetEmployeeSearchBtn =
    document.getElementById(
        "resetEmployeeSearchBtn"
    );


if (resetEmployeeSearchBtn) {

    resetEmployeeSearchBtn.addEventListener(
        "click",
        function() {

            const searchDepartment =
                document.getElementById(
                    "searchDepartment"
                );

            const searchJobRole =
                document.getElementById(
                    "searchJobRole"
                );

            const searchGender =
                document.getElementById(
                    "searchGender"
                );

            const searchOvertime =
                document.getElementById(
                    "searchOvertime"
                );

            const searchAttrition =
                document.getElementById(
                    "searchAttrition"
                );


            if (searchDepartment) {
                searchDepartment.value = "All";
            }

            if (searchJobRole) {
                searchJobRole.value = "All";
            }

            if (searchGender) {
                searchGender.value = "All";
            }

            if (searchOvertime) {
                searchOvertime.value = "All";
            }

            if (searchAttrition) {
                searchAttrition.value = "All";
            }


            // Reload all employees
            searchEmployees();

        }
    );

}


console.log(
    "Employee Search Module: ENABLED"
);