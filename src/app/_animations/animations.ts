import { trigger, animate, transition, style, query } from '@angular/animations';

// USED FOR ROUTER-OUTLET CHANGES
export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 }), { optional: true }),
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(':leave', [style({ opacity: 1, height: '100%' }), animate('0.3s', style({ opacity: 0 }))], {
            optional: true
        }),
        query(':enter', [style({ opacity: 0, height: '100%' }), animate('0.3s', style({ opacity: 1 }))], {
            optional: true
        })
    ])
]);

export const fadeAnimationChild = trigger('fadeAnimationChild', [
    transition('* => *', [
        query(
            ':enter, :leave',
            style({ position: 'absolute', top: 0, left: 0, right: 0, 'padding-left': '15px', 'padding-right': '15px' }),
            { optional: true }
        ),
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(':leave', [style({ opacity: 1, height: '100%' }), animate('0.3s', style({ opacity: 0 }))], {
            optional: true
        }),
        query(':enter', [style({ opacity: 0, height: '100%' }), animate('0.3s', style({ opacity: 1 }))], {
            optional: true
        })
    ])
]);
