# Secure Fields examples

This project contains sample code for implementing a visually pleasing credit card form.

Further information can be found here:
- [As a Datatrans Payments customer](https://docs.datatrans.ch/docs/secure-fields)
- [As a PCI Proxy customer](https://docs.pci-proxy.com/collect/secure-fields-js)


## Online Demo

Visit the [online demo](https://datatrans.github.io/secure-fields-sample/pciproxy-examples) here.

**Note**: Please only ever use `secureFields.initTokenize(...)` when you are a PCI Proxy customer.


## Example using React for Payments customers

An example of how to implement this behaviour in modern web applications can be found in the
[react-example-init](react-example-init/) folder.

**For Demo purposes only:**
This example also guides you through the backend calls to initialize and authorize transactions.


## Example using React for PCI Proxy customers

An example of how to implement this behaviour in modern web applications can be found in the
[react-example-initTokenize](react-example-initTokenize/) folder.

**Note**: Please only ever use `secureFields.initTokenize(...)` when you are a PCI Proxy customer.
