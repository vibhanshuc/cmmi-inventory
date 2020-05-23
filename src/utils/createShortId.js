import shortid from 'shortid';

function createShortId() {
  return shortid.generate();
}

export default createShortId;
