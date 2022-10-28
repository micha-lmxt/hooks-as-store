import { addPage } from 'partial-hydration-sk';
import Page from './Page.svx';

export const prerender = true;

export async function load() {
	addPage(Page, 'page');
}
