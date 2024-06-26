export const ASSET_URL = '../assets/images'

export const BASE_URL = 'https://dashboard-api.mereos-datasafe.com'


const generateFirstName = () => {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Chris', 'Olivia', 'Daniel', 'Sophia'];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

// Function to generate random last name (surname)
const generateLastName = () => {
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

// Function to generate random email address
const generateEmail = () => {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com', 'company.com'];
  const firstName = generateFirstName().toLowerCase();
  const lastName = generateLastName().toLowerCase();
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName}.${lastName}@${domain}`;
};

// Function to generate random phone number
const generatePhoneNumber = () => {
  const phoneNumber = Math.random().toString().slice(2, 12); // Generates a 10-digit number
  return phoneNumber;
};

// Generate random data object
export const generateRandomData = () => {
  const firstName = generateFirstName();
  const lastName = generateLastName();
  const email = generateEmail();
  const phone = generatePhoneNumber();

  const data = {
      first_name: firstName,
      surname: lastName,
      email: email,
      phone: phone,
      assessment_id: 541
  };

  return data;
};