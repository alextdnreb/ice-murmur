import { Ice } from "ice";
import { Murmur } from "./generated/Murmur";

(async () => {
  let communicator: Ice.Communicator;
  try {
    const props = Ice.createProperties()
    props.setProperty("Ice.ImplicitContext", "Shared")
    const data = new Ice.InitializationData()
    data.properties = props
    communicator = Ice.initialize(data);    
    const proxy = communicator.stringToProxy("Meta:tcp -h localhost -p 6502");
    communicator.getImplicitContext().put("secret", "asd")
    const meta = await Murmur.MetaPrx.checkedCast(proxy);
    const server = await meta.newServer()
    await server.start()
    console.log(await server.id())
  } catch (ex) {
    console.log(ex.toString());
  } finally {
    if (communicator) {
      await communicator.destroy();
    }
  }
})();
