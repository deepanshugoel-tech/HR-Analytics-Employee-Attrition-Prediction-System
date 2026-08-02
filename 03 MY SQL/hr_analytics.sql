USE hr_analytics;

-- Total Employees
SELECT COUNT(*) AS Total_Employees FROM employee_attrition;

-- Total Attrition
SELECT COUNT(*) AS Total_Attrition
FROM employee_attrition
WHERE Attrition='Yes';

-- Attrition Rate
SELECT ROUND(COUNT(CASE WHEN Attrition='Yes' THEN 1 END)*100.0/COUNT(*),2) AS Attrition_Rate
FROM employee_attrition;

-- Average Age
SELECT ROUND(AVG(Age),2) AS Average_Age
FROM employee_attrition;

-- Average Monthly Income
SELECT ROUND(AVG(MonthlyIncome),2) AS Average_Monthly_Income
FROM employee_attrition;

-- Department Wise Employees
SELECT Department, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY Department;

-- Department Wise Attrition
SELECT Department, COUNT(*) AS Attrition
FROM employee_attrition
WHERE Attrition='Yes'
GROUP BY Department;

-- Gender Wise Employees
SELECT Gender, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY Gender;

-- Gender Wise Attrition
SELECT Gender, COUNT(*) AS Attrition
FROM employee_attrition
WHERE Attrition='Yes'
GROUP BY Gender;
SELECT JobRole, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY JobRole
ORDER BY Employees DESC;
SELECT JobRole, COUNT(*) AS Attrition
FROM employee_attrition
WHERE Attrition = 'Yes'
GROUP BY JobRole
ORDER BY Attrition DESC;
SELECT OverTime, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY OverTime;
SELECT OverTime, COUNT(*) AS Attrition
FROM employee_attrition
WHERE Attrition = 'Yes'
GROUP BY OverTime;
SELECT MaritalStatus, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY MaritalStatus;
SELECT EducationField, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY EducationField
ORDER BY Employees DESC;
SELECT BusinessTravel, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY BusinessTravel;
SELECT Department,
ROUND(AVG(MonthlyIncome),2) AS Average_Salary
FROM employee_attrition
GROUP BY Department;
SELECT ROUND(AVG(TotalWorkingYears),2) AS Average_Working_Years
FROM employee_attrition;
SELECT MAX(MonthlyIncome) AS Highest_Salary
FROM employee_attrition;
SELECT MIN(MonthlyIncome) AS Lowest_Salary
FROM employee_attrition;
SELECT EmployeeNumber, MonthlyIncome
FROM employee_attrition
ORDER BY MonthlyIncome DESC
LIMIT 10;
SELECT WorkLifeBalance, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY WorkLifeBalance;
SELECT PerformanceRating, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY PerformanceRating;
SELECT EnvironmentSatisfaction, COUNT(*) AS Employees
FROM employee_attrition
GROUP BY EnvironmentSatisfaction;


