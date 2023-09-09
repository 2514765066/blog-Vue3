export default {
	install(app) {
		//拖拽指令
		app.directive("drag", (el, binding) => {
			let list = el;
			let draggle_node;
			for (let item of list.children) {
				item.draggable = true;
			}
			list.addEventListener("dragstart", e => {
				draggle_node = e.target;
				setTimeout(() => {
					e.target.classList.add("dragmoving");
				}, 0);
			});
			list.addEventListener("dragover", e => {
				e.preventDefault();
			});
			list.addEventListener("dragenter", e => {
				try {
					e.preventDefault();
					if (e.target == list || e.target == draggle_node) return;

					const children = Array.from(list.children);
					const sourceIndex = children.indexOf(draggle_node);
					const targetIndex = children.indexOf(e.target);
					if (sourceIndex < targetIndex) {
						list.insertBefore(draggle_node, e.target.nextElementSibling);
					} else {
						list.insertBefore(draggle_node, e.target);
					}
				} catch {}
			});
			list.addEventListener("dragend", e => {
				e.target.classList.remove("dragmoving");
			});
		});
		//媒体查询指令
		app.directive("media", (el, binding) => {
			if (binding.modifiers.r) {
				if (screen.width > binding.value) {
					el.classList.add("d-n");
				}
				return;
			}
			if (screen.width <= binding.value) {
				el.classList.add("d-n");
			}
		});
	},
};
