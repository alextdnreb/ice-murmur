import { Ice } from "ice";
import { Murmur } from "./generated/Murmur";

(async () => {
  let communicator: Ice.Communicator;
  try {
    communicator = Ice.initialize();
    const proxy = communicator.stringToProxy("Meta:tcp -h localhost -p 6502");
    const meta = await Murmur.MetaPrx.checkedCast(proxy);
    // const server = await meta.newServer();
    // server.start();

    // console.log(server.id());
  } catch (ex) {
    console.log(ex.toString());
  } finally {
    if (communicator) {
      await communicator.destroy();
    }
  }
})();
