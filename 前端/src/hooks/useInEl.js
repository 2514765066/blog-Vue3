export const inEl = (startNode, endEl, elName) => {
	try {
		if (startNode.nodeName == elName) {
			return true;
		}
		while (startNode.parentElement != endEl) {
			startNode = startNode.parentNode;
			if (startNode.nodeName == elName) {
				return true;
			}
		}
		return false;
	} catch {}
};
