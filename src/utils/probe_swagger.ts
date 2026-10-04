import axios from 'axios';

async function probeSwagger() {
  try {
    const buggyDocs = await axios.get('https://api-with-bugs.practicesoftwaretesting.com/api-docs.json').catch(() => null)
      || await axios.get('https://api-with-bugs.practicesoftwaretesting.com/docs/api-docs.json').catch(() => null);

    if (buggyDocs) {
      console.log('Found Buggy API Docs!');
      console.log(Object.keys(buggyDocs.data.paths || {}));
    } else {
      console.log('Could not fetch raw json, let\'s probe cart and order routes directly.');
    }
  } catch (err) {
    console.error(err);
  }
}

probeSwagger();
